"use server";

export async function checkServerStatus() {
  console.log("Server action ping received at:", new Date().toISOString());
  return { status: "ok" };
}

import { createServerSideClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const bioText = formData.get("bio_text") as string;
  const fullName = formData.get("full_name") as string;
  const background = formData.get("background") as string;
  const demographics = formData.get("demographics") as string;
  const navTitle = formData.get("nav_title") as string;
  const portfolioHeading = formData.get("portfolio_heading") as string;
  const portfolioIntro = formData.get("portfolio_intro") as string;
  const projectsHeading = formData.get("projects_heading") as string;
  const projectsSubheading = formData.get("projects_subheading") as string;
  const emptyProjectsText = formData.get("empty_projects_text") as string;
  const footerText = formData.get("footer_text") as string;
  const contactEmail = formData.get("contact_email") as string;

  const imageFile = formData.get("avatar") as File;
  let avatarUrl = formData.get("existing_avatar_url") as string;

  if (imageFile && imageFile.size > 0) {
    console.log(`Uploading image: ${imageFile.name}, size: ${imageFile.size} bytes`);
    const fileName = `avatar-${user.id}-${Date.now()}`;
    
    // Attempt auto-creation if bucket doesn't exist
    let { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError && uploadError.message === "Bucket not found") {
      try {
        await supabase.storage.createBucket("portfolio-images", { public: true });
        const retry = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imageFile);
        uploadData = retry.data;
        uploadError = retry.error;
      } catch {
        // Fall through to error handler if creation is not permitted
      }
    }

    if (uploadError || !uploadData) {
      console.error("Supabase Storage Error:", uploadError);
      if (uploadError?.message === "Bucket not found") {
        return {
          error:
            "Storage bucket 'portfolio-images' not found. Please create a public bucket named 'portfolio-images' in your Supabase dashboard.",
        };
      }
      return { error: uploadError?.message || "Failed to upload image" };
    }
    console.log("Upload successful:", uploadData.path);

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(uploadData.path);

    avatarUrl = publicUrl;
  }

  const { error } = await supabase.from("profile").upsert({
    id: user.id,
    bio_text: bioText || undefined,
    full_name: fullName || undefined,
    background: background || undefined,
    demographics: demographics || undefined,
    avatar_url: avatarUrl || undefined,
    nav_title: navTitle || undefined,
    portfolio_heading: portfolioHeading || undefined,
    portfolio_intro: portfolioIntro || undefined,
    projects_heading: projectsHeading || undefined,
    projects_subheading: projectsSubheading || undefined,
    empty_projects_text: emptyProjectsText || undefined,
    footer_text: (footerText === "|||" ? undefined : footerText),
    contact_email: contactEmail || undefined,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function addProject(formData: FormData) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const statusText = formData.get("status_text") as string;
  const projectUrl = formData.get("project_url") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = "";

  if (imageFile && imageFile.size > 0) {
    console.log(`Uploading project image: ${imageFile.name}, size: ${imageFile.size} bytes`);
    const fileName = `${Date.now()}-${imageFile.name}`;
    let { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError && uploadError.message === "Bucket not found") {
      try {
        await supabase.storage.createBucket("portfolio-images", { public: true });
        const retry = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imageFile);
        uploadData = retry.data;
        uploadError = retry.error;
      } catch {
        // Fall through to error handler if creation is not permitted
      }
    }

    if (uploadError || !uploadData) {
      console.error("Supabase Storage Error:", uploadError);
      if (uploadError?.message === "Bucket not found") {
        return {
          error:
            "Storage bucket 'portfolio-images' not found. Please create a public bucket named 'portfolio-images' in your Supabase dashboard.",
        };
      }
      return { error: uploadError?.message || "Failed to upload image" };
    }
    console.log("Upload successful:", uploadData.path);

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(uploadData.path);

    imageUrl = publicUrl;
  }

  const { error } = await supabase.from("projects").insert({
    title,
    description,
    status_text: statusText,
    image_url: imageUrl,
    project_url: projectUrl,
  });

  if (error) throw error;

  revalidatePath("/");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const statusText = formData.get("status_text") as string;
  const projectUrl = formData.get("project_url") as string;
  const imageFile = formData.get("image") as File;
  let imageUrl = formData.get("existing_image_url") as string;

  if (imageFile && imageFile.size > 0) {
    console.log(`Uploading project image: ${imageFile.name}, size: ${imageFile.size} bytes`);
    const fileName = `${Date.now()}-${imageFile.name}`;
    let { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError && uploadError.message === "Bucket not found") {
      try {
        await supabase.storage.createBucket("portfolio-images", { public: true });
        const retry = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imageFile);
        uploadData = retry.data;
        uploadError = retry.error;
      } catch {
        // Fall through to error handler if creation is not permitted
      }
    }

    if (uploadError || !uploadData) {
      console.error("Supabase Storage Error:", uploadError);
      if (uploadError?.message === "Bucket not found") {
        return {
          error:
            "Storage bucket 'portfolio-images' not found. Please create a public bucket named 'portfolio-images' in your Supabase dashboard.",
        };
      }
      return { error: uploadError?.message || "Failed to upload image" };
    }
    console.log("Upload successful:", uploadData.path);

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(uploadData.path);

    imageUrl = publicUrl;
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title: title || undefined,
      description: description || undefined,
      status_text: statusText || undefined,
      image_url: imageUrl || undefined,
      project_url: projectUrl || undefined,
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
}

export async function deleteProject(id: string, imageUrl?: string) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Optionally delete image from storage
  if (imageUrl) {
    const path = imageUrl.split("/").pop();
    if (path) {
      await supabase.storage.from("portfolio-images").remove([path]);
    }
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/");
}

export async function logout() {
  const supabase = await createServerSideClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}
