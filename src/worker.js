export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. CORS Middleware: Allowing your React app to talk to this Worker
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle Browser "Preflight" requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Admin Auth: Protect POST and DELETE actions
    if (request.method === "POST" || request.method === "DELETE") {
      const authHeader = request.headers.get("Authorization");
      const API_KEY = "eduardo-super-secret-key"; 

      if (authHeader !== API_KEY) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid API Key" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 3. Routing & Logic
    try {
      // --- IMAGE SERVER: Serve R2 files publicly (Section 2.8) ---
      if (url.pathname.startsWith("/images/")) {
        const imageKey = url.pathname.split("/").pop();
        const object = await env.BUCKET.get(imageKey);

        if (!object) {
          return new Response("Image Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("Access-Control-Allow-Origin", "*");
        return new Response(object.body, { headers });
      }

      // --- GET: Fetch Inventory List (Section 2.7) ---
      if (url.pathname === "/api/inventory" && request.method === "GET") {
        const { results } = await env.DB.prepare("SELECT * FROM cars ORDER BY id DESC").all();
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // --- POST: Add New Car with Multi-Image Support (Section 2.5/2.6) ---
      if (url.pathname === "/api/inventory" && request.method === "POST") {
        const formData = await request.formData();
        const imageFiles = formData.getAll("images"); // Grabs all uploaded files
        const uploadedKeys = [];

        // Upload loop for R2
        for (const file of imageFiles) {
          const key = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`.toLowerCase();
          await env.BUCKET.put(key, file);
          uploadedKeys.push(key);
        }

        // Save metadata to D1
        await env.DB.prepare(`
          INSERT INTO cars (make, model, year, price, miles, images) 
          VALUES (?, ?, ?, ?, ?, ?)
        `)
        .bind(
          formData.get("make"), 
          formData.get("model"), 
          formData.get("year"), 
          formData.get("price"), 
          formData.get("miles"), 
          uploadedKeys.join(',') // Stores as "img1.jpg,img2.jpg"
        )
        .run();

        return new Response(JSON.stringify({ success: "Car added successfully" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // --- DELETE: Cleanup D1 and R2 simultaneously (Section 2.9) ---
      if (url.pathname.startsWith("/api/inventory/") && request.method === "DELETE") {
        const id = url.pathname.split("/").pop();

        // 1. Get image filenames first
        const car = await env.DB.prepare("SELECT images FROM cars WHERE id = ?").bind(id).first();

        if (car?.images) {
          // 2. Delete each file from R2
          const imageKeys = car.images.split(',');
          for (const key of imageKeys) {
            await env.BUCKET.delete(key);
          }
        }

        // 3. Delete row from D1
        await env.DB.prepare("DELETE FROM cars WHERE id = ?").bind(id).run();

        return new Response(JSON.stringify({ success: `Car ${id} and images deleted.` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response("Route Not Found", { status: 404, headers: corsHeaders });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Server Error", details: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};