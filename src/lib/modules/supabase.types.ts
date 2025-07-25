export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string | null
          created_at: string
          does_expire: boolean | null
          expire_date: number | null
          id: number
          pinned: boolean | null
          posted_by: string | null
          priority: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          does_expire?: boolean | null
          expire_date?: number | null
          id?: number
          pinned?: boolean | null
          posted_by?: string | null
          priority?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          does_expire?: boolean | null
          expire_date?: number | null
          id?: number
          pinned?: boolean | null
          posted_by?: string | null
          priority?: number
        }
        Relationships: []
      }
      audit: {
        Row: {
          action: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: number
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      navigation: {
        Row: {
          href: string
          icon: string
          id: number
          label: string
          position: number
          scope: number
        }
        Insert: {
          href: string
          icon: string
          id?: number
          label: string
          position: number
          scope?: number
        }
        Update: {
          href?: string
          icon?: string
          id?: number
          label?: string
          position?: number
          scope?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string
          avatar: string | null
          birth_date: string
          birth_place: string
          first_name: string
          last_name: string
          middle_name: string | null
          position: string
          user_id: string
        }
        Insert: {
          address?: string
          avatar?: string | null
          birth_date: string
          birth_place?: string
          first_name?: string
          last_name?: string
          middle_name?: string | null
          position?: string
          user_id: string
        }
        Update: {
          address?: string
          avatar?: string | null
          birth_date?: string
          birth_place?: string
          first_name?: string
          last_name?: string
          middle_name?: string | null
          position?: string
          user_id?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["permission"]
          role: Database["public"]["Enums"]["roles"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["permission"]
          role: Database["public"]["Enums"]["roles"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["permission"]
          role?: Database["public"]["Enums"]["roles"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["roles"]
          user_id: string
          verified: boolean
        }
        Insert: {
          role?: Database["public"]["Enums"]["roles"]
          user_id: string
          verified?: boolean
        }
        Update: {
          role?: Database["public"]["Enums"]["roles"]
          user_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["permission"]
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
      process_all_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_existing_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      permission:
        | "forum_posts.delete"
        | "announcements.insert"
        | "announcements.update"
        | "announcements.delete"
        | "faqs.insert"
        | "faqs.update"
        | "faqs.delete"
        | "documents.insert"
        | "documents.update"
        | "documents.delete"
        | "user_roles.update"
        | "user_roles.select"
        | "profiles.select"
        | "profiles.update"
        | "navigation.admin"
        | "navigation.constituent"
        | "navigation.official"
      roles: "admin" | "official" | "constituent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      permission: [
        "forum_posts.delete",
        "announcements.insert",
        "announcements.update",
        "announcements.delete",
        "faqs.insert",
        "faqs.update",
        "faqs.delete",
        "documents.insert",
        "documents.update",
        "documents.delete",
        "user_roles.update",
        "user_roles.select",
        "profiles.select",
        "profiles.update",
        "navigation.admin",
        "navigation.constituent",
        "navigation.official",
      ],
      roles: ["admin", "official", "constituent"],
    },
  },
} as const
