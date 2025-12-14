import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  description: string;
  thumbnail?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "projects");

/**
 * Get all projects from the content folder
 */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const projectFolders = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const projects: ProjectMeta[] = [];

  for (const folder of projectFolders) {
    const mdxPath = path.join(CONTENT_DIR, folder, "index.mdx");
    
    if (fs.existsSync(mdxPath)) {
      try {
        const fileContent = fs.readFileSync(mdxPath, "utf-8");
        const { data } = matter(fileContent);
        
        // Check for thumbnail in public folder (try svg first, then png)
        let thumbnailPath = `/projects/${folder}/images/thumbnail.svg`;
        let thumbnailExists = fs.existsSync(
          path.join(process.cwd(), "public", "projects", folder, "images", "thumbnail.svg")
        );
        if (!thumbnailExists) {
          thumbnailPath = `/projects/${folder}/images/thumbnail.png`;
          thumbnailExists = fs.existsSync(
            path.join(process.cwd(), "public", "projects", folder, "images", "thumbnail.png")
          );
        }
        
        projects.push({
          slug: folder,
          title: data.title || folder,
          role: data.role || "",
          timeline: data.timeline || "",
          description: data.description || "",
          thumbnail: thumbnailExists ? thumbnailPath : undefined,
        });
      } catch (error) {
        console.error(`Error reading MDX for ${folder}:`, error);
      }
    }
  }

  return projects;
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ProjectMeta | null> {
  const mdxPath = path.join(CONTENT_DIR, slug, "index.mdx");

  if (!fs.existsSync(mdxPath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(mdxPath, "utf-8");
    const { data } = matter(fileContent);
    
    let thumbnailPath = `/projects/${slug}/images/thumbnail.svg`;
    let thumbnailExists = fs.existsSync(
      path.join(process.cwd(), "public", "projects", slug, "images", "thumbnail.svg")
    );
    if (!thumbnailExists) {
      thumbnailPath = `/projects/${slug}/images/thumbnail.png`;
      thumbnailExists = fs.existsSync(
        path.join(process.cwd(), "public", "projects", slug, "images", "thumbnail.png")
      );
    }
    
    return {
      slug,
      title: data.title || slug,
      role: data.role || "",
      timeline: data.timeline || "",
      description: data.description || "",
      thumbnail: thumbnailExists ? thumbnailPath : undefined,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => {
      const mdxPath = path.join(CONTENT_DIR, dirent.name, "index.mdx");
      return fs.existsSync(mdxPath);
    })
    .map((dirent) => dirent.name);
}
