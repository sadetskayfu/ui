import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/shared/constans/routes";
import { TextFieldPage } from "@/pages/TextFieldPage";
import { AutocompletePage } from "@/pages/AutocompletePage";
import { SwitchPage } from "@/pages/SwitchPage";
import { Suspense } from "react";
import { ButtonPage } from "@/pages/ButtonPage";
import { LinkPage } from "@/pages/LinkPage";
import { CheckboxPage } from "@/pages/CheckboxPage";
import { RadioGroupPage } from "@/pages/RadioGroupPage";
import { DropdownPage } from "@/pages/DropDownPage";
import {PaginationPage} from "@/pages/PaginationPage";
import { StarRatingPage } from "@/pages/StarRatingPage";

export const AppRouter = () => {
  return (
      <Suspense>
        <Routes>
          <Route path={ROUTES.BUTTON} element={<ButtonPage />} />
          <Route path={ROUTES.LINK} element={<LinkPage />} />
          <Route path={ROUTES.TEXT_FIELD} element={<TextFieldPage />} />
          <Route path={ROUTES.AUTOCOMPLETE} element={<AutocompletePage />} />
          <Route path={ROUTES.SWITCH} element={<SwitchPage />} />
          <Route path={ROUTES.CHECKBOX} element={<CheckboxPage />} />
          <Route path={ROUTES.RADIO_GROUP} element={<RadioGroupPage />} />
          <Route path={ROUTES.DROPDOWN} element={<DropdownPage />} />
          <Route path={ROUTES.PAGINATION} element={<PaginationPage />} />
          <Route path={ROUTES.STAR_RATING} element={<StarRatingPage />} />
        </Routes>
      </Suspense>
  );
};
