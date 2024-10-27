import { InputVariant, LabelVariant as LabelVariants } from "@/shared/ui/Input";

interface Field {
  value: string;
  errors: string[];
}

export type Mod = 'disabled' | 'required' | 'readonly' | 'validate'

interface ModItem {
  name: Mod,
  label: string
  value: boolean
}

export interface ThemeVariant {
  value: string;
  label: InputVariant;
}

export interface LabelVariant {
  value: string
  label: LabelVariants
}

export interface FieldSchema {
  data: {
    themeVariants: Record<string, ThemeVariant>;
    labelVariants: Record<string, LabelVariant>;
  };
  form: {
    email: Field;
    password: Field;
    selectedThemeVariantId: string;
    selectedLabelVariantId: string
    mods: Record<Mod, ModItem>
  };
}
