import { ComponentsPreview } from "@/feature/ComponentsPreview";
import styles from "./style.module.scss";
import { AppColors } from "@/widgets/AppColors";
import { SectionTitle } from "@/shared/ui/SectionTitle";

export const MainPage = () => {
  return (
    <div className={styles["main"]}>
      <section>
        <SectionTitle>Colors</SectionTitle>
        <AppColors />
      </section>
      <section>
        <SectionTitle>Forms</SectionTitle>
        <ComponentsPreview />
      </section>
    </div>
  );
};
