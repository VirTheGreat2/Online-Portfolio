"use server";

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
    const fileName = `avatar-${user.id}-${Date.now()}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(uploadData.path);

    avatarUrl = publicUrl;
  }

  const { error } = await supabase.from("profile").upsert({
    id: user.id,
    bio_text: bioText,
    full_name: fullName,
    background: background,
    demographics: demographics,
    avatar_url: avatarUrl,
    nav_title: navTitle,
    portfolio_heading: portfolioHeading,
    portfolio_intro: portfolioIntro,
    projects_heading: projectsHeading,
    projects_subheading: projectsSubheading,
    empty_projects_text: emptyProjectsText,
    footer_text: footerText,
    contact_email: contactEmail,
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
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

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
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-images").getPublicUrl(uploadData.path);

    imageUrl = publicUrl;
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description,
      status_text: statusText,
      image_url: imageUrl,
      project_url: projectUrl,
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
