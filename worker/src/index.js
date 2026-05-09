export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST" || request.method === "DELETE") {
      const authHeader = request.headers.get("Authorization");
      if (authHeader !== env.ADMIN_KEY) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    try {
      if (url.pathname.startsWith("/images/")) {
        const imageKey = url.pathname.split("/").pop();
        const object = await env.BUCKET.get(imageKey);
        if (!object) return new Response("Not Found", { status: 404 });
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("Access-Control-Allow-Origin", "*");
        return new Response(object.body, { headers });
      }

      if (url.pathname === "/api/inventory" && request.method === "GET") {
        const { results } = await env.DB.prepare("SELECT * FROM cars ORDER BY id DESC").all();
        return new Response(JSON.stringify(results), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (url.pathname.startsWith("/api/inventory/feature/") && request.method === "POST") {
        const id = url.pathname.split("/").pop();
        const { featured } = await request.json(); 

        await env.DB.prepare("UPDATE cars SET is_featured = ? WHERE id = ?")
          .bind(featured, id)
          .run();

        return new Response(JSON.stringify({ success: true }), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      if (url.pathname === "/api/inventory" && request.method === "POST") {
        const formData = await request.formData();
        const imageFiles = formData.getAll("images");
        const uploadedKeys = [];

        for (const file of imageFiles) {
          if (file.size > 0) {
            const key = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            await env.BUCKET.put(key, file);
            uploadedKeys.push(key);
          }
        }

        await env.DB.prepare(`
          INSERT INTO cars (make, model, year, price, miles, images, description, is_featured) 
          VALUES (?, ?, ?, ?, ?, ?, ?, 0)
        `)
        .bind(
          formData.get("make"), 
          formData.get("model"), 
          formData.get("year"), 
          formData.get("price"), 
          formData.get("miles"), 
          uploadedKeys.join(','),
          formData.get("description")
        )
        .run();

        return new Response(JSON.stringify({ success: true }), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      if (url.pathname.startsWith("/api/inventory/") && request.method === "DELETE") {
        const id = url.pathname.split("/").pop();
        const car = await env.DB.prepare("SELECT images FROM cars WHERE id = ?").bind(id).first();
        
        if (car?.images) {
          const keys = car.images.split(',');
          for (const key of keys) {
            if (key.trim()) {
              await env.BUCKET.delete(key.trim());
            }
          }
        }

        await env.DB.prepare("DELETE FROM cars WHERE id = ?").bind(id).run();
        
        return new Response(JSON.stringify({ success: true }), { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }

      return new Response("Endpoint Not Found", { status: 404, headers: corsHeaders });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};