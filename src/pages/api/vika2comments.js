// src/pages/api/vika2comments.js

export const prerender = false;

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ovxenwdqqcyxfpceebdn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eGVud2RxcWN5eGZwY2VlYmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDg2NDEsImV4cCI6MjA1NDMyNDY0MX0.aqU6h9b1Njf4Z_LTyejrPPm98wETTwZpgwstayqEAkA";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase.from("vika2").select("*");

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ comments: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, comment } = body;

    if (!name || !comment) {
      return new Response(
        JSON.stringify({ error: "Name and comment are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("vika2")
      .insert([{ name, comment }]);

    if (error) {
      console.error("Error inserting comment:", error.message);
      return new Response(
        JSON.stringify({ error: "Error inserting comment: " + error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Comment added successfully!", data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
