import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { UserMenu } from "@/widgets/UserMenu";


const DropdownPage = () => {

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Menu</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Menu">
            <UserMenu />
            <UserMenu />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default DropdownPage;
