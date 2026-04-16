"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Upload, 
  FileText, 
  FolderOpen, 
  LogOut, 
  User as UserIcon,
  Plus,
  Search,
  MoreVertical,
  Download,
  Trash2,
  Grid,
  List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-tight">Zakaa</span>
              <span className="text-xs text-muted-foreground font-arabic">ذكاء</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{user.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button variant="outline">
              <FolderOpen className="w-4 h-4 mr-2" />
              New Folder
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search files..." 
                className="pl-10 w-64 bg-secondary border-border"
              />
            </div>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-secondary" : "hover:bg-secondary/50"}`}
              >
                <Grid className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-secondary" : "hover:bg-secondary/50"}`}
              >
                <List className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 px-4">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">No files yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Upload your first file to get started. Drag and drop files here or click the upload button above.
          </p>
          <Button size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Upload your first file
          </Button>
        </div>

        {/* Files Grid - Shows when there are files */}
        {/* 
        <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" : "space-y-2"}>
          {files.map((file) => (
            <FileCard key={file.id} file={file} viewMode={viewMode} />
          ))}
        </div>
        */}
      </main>
    </div>
  )
}
