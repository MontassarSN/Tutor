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
      cart: {
        Row: {
          course_id: string
          created_at: string
          id: string
          instructor_id: string
          price: number
          user_id: string
        }
        Insert: {
          course_id?: string
          created_at?: string
          id?: string
          instructor_id?: string
          price: number
          user_id?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          instructor_id?: string
          price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          course_id: string | null
          created_at: string
          id: number
          rating: number | null
          user_id: string
        }
        Insert: {
          content?: string
          course_id?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          user_id?: string
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string
          id?: number
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      courses: {
        Row: {
          audience: string[] | null
          congratsmessage: string | null
          created_at: string
          description: string | null
          discount: number | null
          duration: number | null
          id: string
          instructor_ids: string[] | null
          label: number | null
          language: string | null
          level: string | null
          numberOfRatings: number | null
          pic: string | null
          price: number | null
          rating: number
          requirements: string[] | null
          status: string | null
          students: number | null
          subjects: string[] | null
          sublabel: number | null
          subtitle: string | null
          subtitle_language: string | null
          title: string | null
          topic: string | null
          trailer: string | null
          user_id: string
          welcomemessage: string | null
        }
        Insert: {
          audience?: string[] | null
          congratsmessage?: string | null
          created_at?: string
          description?: string | null
          discount?: number | null
          duration?: number | null
          id?: string
          instructor_ids?: string[] | null
          label?: number | null
          language?: string | null
          level?: string | null
          numberOfRatings?: number | null
          pic?: string | null
          price?: number | null
          rating?: number
          requirements?: string[] | null
          status?: string | null
          students?: number | null
          subjects?: string[] | null
          sublabel?: number | null
          subtitle?: string | null
          subtitle_language?: string | null
          title?: string | null
          topic?: string | null
          trailer?: string | null
          user_id: string
          welcomemessage?: string | null
        }
        Update: {
          audience?: string[] | null
          congratsmessage?: string | null
          created_at?: string
          description?: string | null
          discount?: number | null
          duration?: number | null
          id?: string
          instructor_ids?: string[] | null
          label?: number | null
          language?: string | null
          level?: string | null
          numberOfRatings?: number | null
          pic?: string | null
          price?: number | null
          rating?: number
          requirements?: string[] | null
          status?: string | null
          students?: number | null
          subjects?: string[] | null
          sublabel?: number | null
          subtitle?: string | null
          subtitle_language?: string | null
          title?: string | null
          topic?: string | null
          trailer?: string | null
          user_id?: string
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
          approved: boolean
          company_name: string | null
          created_at: string
          description: string | null
          facebook: string | null
          instagram: string | null
          linkdin: string | null
          raiting: string | null
          rating: number | null
          students: number | null
          title: string | null
          twitter: string | null
          user_id: string
          website: string | null
          whatsup: string | null
          youtube: string | null
        }
        Insert: {
          approved?: boolean
          company_name?: string | null
          created_at?: string
          description?: string | null
          facebook?: string | null
          instagram?: string | null
          linkdin?: string | null
          raiting?: string | null
          rating?: number | null
          students?: number | null
          title?: string | null
          twitter?: string | null
          user_id: string
          website?: string | null
          whatsup?: string | null
          youtube?: string | null
        }
        Update: {
          approved?: boolean
          company_name?: string | null
          created_at?: string
          description?: string | null
          facebook?: string | null
          instagram?: string | null
          linkdin?: string | null
          raiting?: string | null
          rating?: number | null
          students?: number | null
          title?: string | null
          twitter?: string | null
          user_id?: string
          website?: string | null
          whatsup?: string | null
          youtube?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
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
          captions: string | null
          course_id: string | null
          created_at: string
          description: string | null
          file: string | null
          id: string
          notes: string | null
          order: number | null
          section_id: string
          title: string | null
          video_url: string | null
        }
        Insert: {
          captions?: string | null
          course_id?: string | null
          created_at?: string
          description?: string | null
          file?: string | null
          id?: string
          notes?: string | null
          order?: number | null
          section_id: string
          title?: string | null
          video_url?: string | null
        }
        Update: {
          captions?: string | null
          course_id?: string | null
          created_at?: string
          description?: string | null
          file?: string | null
          id?: string
          notes?: string | null
          order?: number | null
          section_id?: string
          title?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lectures_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lectures_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          course_id: string
          created_at: string
          id: string
          instructor_id: string | null
          price: number
          user_id: string
        }
        Insert: {
          course_id?: string
          created_at?: string
          id?: string
          instructor_id?: string | null
          price: number
          user_id?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          instructor_id?: string | null
          price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      sections: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          order: number | null
          title: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          order?: number | null
          title?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
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
          phone_number: string | null
          pic: string | null
          role: Database["public"]["Enums"]["role"] | null
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string
          FirstName?: string | null
          LastName?: string | null
          phone_number?: string | null
          pic?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          FirstName?: string | null
          LastName?: string | null
          phone_number?: string | null
          pic?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      approved: "true" | "false" | "waiting"
      role: "user" | "admin"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
