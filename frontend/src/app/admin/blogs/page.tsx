"use client";

import { useState, useEffect } from "react";
import { Blog } from "@/types";
import { getBlogs, fetchAPI } from "@/lib/api-client";
import MediaLibraryModal from "@/components/MediaLibraryModal";
import { FileText, Plus, Trash2, Edit3, Loader2, FolderOpen } from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Veda Brahma Shri Pradeep Nadig");
  const [category, setCategory] = useState("Vedic Traditions");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      cover_image: coverImage,
      author,
      publish_date: new Date().toISOString().split("T")[0],
      category,
      tags: [category],
      content,
      seo_title: title,
      seo_description: content.substring(0, 150),
    };

    try {
      if (editingId) {
        await fetchAPI(`/blogs/${editingId}`, {
          method: "PUT",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAPI("/blogs", {
          method: "POST",
          headers: { Authorization: "Bearer mock-admin-token" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      loadBlogs();
    } catch (err: any) {
      alert("Error saving blog: " + err.message);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCoverImage(blog.cover_image || "");
    setAuthor(blog.author || "Veda Brahma Shri Pradeep Nadig");
    setCategory(blog.category || "Vedic Traditions");
    setContent(blog.content || "");
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await fetchAPI(`/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer mock-admin-token" },
      });
      loadBlogs();
    } catch (err: any) {
      alert("Error deleting blog: " + err.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCoverImage("");
    setAuthor("Veda Brahma Shri Pradeep Nadig");
    setCategory("Vedic Traditions");
    setContent("");
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7 text-amber-700" />
            <span>Manage Blog Articles</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish spiritual articles, news, and insights with SEO-friendly slugs.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Post</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            {editingId ? "Edit Blog Post" : "Publish New Blog Post"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Slug (SEO Friendly URL) *</label>
              <input
                type="text"
                required
                placeholder="e.g. significance-of-sandhyavandana"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Author Name *</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Category *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm"
              />
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 flex items-center gap-1.5 shrink-0"
              >
                <FolderOpen className="w-4 h-4 text-amber-700" />
                <span>Media Library</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Article Content *</label>
            <textarea
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-sans"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              Save &amp; Publish Post
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-700" />
          <span>Loading blog articles...</span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{b.title}</td>
                  <td className="p-4 font-mono text-slate-500">/blogs/{b.slug}</td>
                  <td className="p-4 font-semibold text-amber-800">{b.category || "General"}</td>
                  <td className="p-4 text-slate-600">{b.author}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(b)} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelectMedia={(url) => setCoverImage(url)}
      />
    </div>
  );
}
