export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          audience: string[] | null
          congratsmessage: string | null
          created_at: string
          description: string | null
          discount: string | null
          duration: number | null
          id: number
          label: number | null
          language: string | null
          level: string | null
          pic: string | null
          price: string | null
          requirements: string[] | null
          stars: string | null
          status: string | null
          students: number | null
          subjects: string[] | null
          sublabel: number | null
          subtitle: string | null
          subtitle_language: string | null
          title: string | null
          topic: string | null
          trailer: string | null
          user_id: string | null
          welcomemessage: string | null
        }
        Insert: {
          audience?: string[] | null
          congratsmessage?: string | null
          created_at?: string
          description?: string | null
          discount?: string | null
          duration?: number | null
          id?: number
          label?: number | null
          language?: string | null
          level?: string | null
          pic?: string | null
          price?: string | null
          requirements?: string[] | null
          stars?: string | null
          status?: string | null
          students?: number | null
          subjects?: string[] | null
          sublabel?: number | null
          subtitle?: string | null
          subtitle_language?: string | null
          title?: string | null
          topic?: string | null
          trailer?: string | null
          user_id?: string | null
          welcomemessage?: string | null
        }
        Update: {
          audience?: string[] | null
          congratsmessage?: string | null
          created_at?: string
          description?: string | null
          discount?: string | null
          duration?: number | null
          id?: number
          label?: number | null
          language?: string | null
          level?: string | null
          pic?: string | null
          price?: string | null
          requirements?: string[] | null
          stars?: string | null
          status?: string | null
          students?: number | null
          subjects?: string[] | null
          sublabel?: number | null
          subtitle?: string | null
          subtitle_language?: string | null
          title?: string | null
          topic?: string | null
          trailer?: string | null
          user_id?: string | null
          welcomemessage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_sublabel_fkey"
            columns: ["sublabel"]
            isOneToOne: false
            referencedRelation: "labelcolors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_label"
            columns: ["label"]
            isOneToOne: false
            referencedRelation: "labelcolors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          company_name: string | null
          created_at: string
          description: string | null
          raiting: string | null
          students: number | null
          title: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          raiting?: string | null
          students?: number | null
          title?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          description?: string | null
          raiting?: string | null
          students?: number | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instructors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      labelcolors: {
        Row: {
          colors: string | null
          created_at: string
          id: number
          label: string | null
        }
        Insert: {
          colors?: string | null
          created_at?: string
          id?: number
          label?: string | null
        }
        Update: {
          colors?: string | null
          created_at?: string
          id?: number
          label?: string | null
        }
        Relationships: []
      }
      lectures: {
        Row: {
          created_at: string
          description: string | null
          id: number
          notes: string | null
          order: number | null
          section_id: number | null
          title: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          notes?: string | null
          order?: number | null
          section_id?: number | null
          title?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          notes?: string | null
          order?: number | null
          section_id?: number | null
          title?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lectures_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          order: number | null
          title: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          order?: number | null
          title?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          order?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          FirstName: string | null
          LastName: string | null
          pic: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string
          FirstName?: string | null
          LastName?: string | null
          pic?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          FirstName?: string | null
          LastName?: string | null
          pic?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
