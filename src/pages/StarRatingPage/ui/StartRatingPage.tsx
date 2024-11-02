import { StarRating } from "@/shared/ui/StarRating";
import styles from "./style.module.scss";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { useCallback, useEffect, useState } from "react";
import { PreviewComponents } from "@/widgets/PreviewComponents";

const StarRatingPage = () => {
  const [rating1, setRating1] = useState<number>(1);
  const [rating2, setRating2] = useState<number>(0);
  const [rating3, setRating3] = useState<number>(1);
  const [rating4, setRating4] = useState<number>(1);
  const [rating5, setRating5] = useState<number>(1);
  const [avgRating, setAvgRating] = useState<number>(0)

  const handleChangeRating1 = useCallback((value: number) => {
    setRating1(value);
  }, []);
  const handleChangeRating2 = useCallback((value: number) => {
    setRating2(value);
  }, []);
  const handleChangeRating3 = useCallback((value: number) => {
    setRating3(value);
  }, []);
  const handleChangeRating4 = useCallback((value: number) => {
    setRating4(value);
  }, []);
  const handleChangeRating5 = useCallback((value: number) => {
    setRating5(value);
  }, []);

  useEffect(() => {
    const avg = (rating1 + rating3 + rating4 + rating5) / 4
    setAvgRating(avg)
  }, [rating1, rating3, rating4, rating5])

  return (
    <div className={styles["page"]}>
      <SectionTitle>Star rating</SectionTitle>
      <PreviewComponents title="5 stars">
        <StarRating
          title="Rating 5 stars"
          initialRating={rating1}
          maxStars={5}
          onChange={handleChangeRating1}
          name="5-stars"
          size="medium"
        />
      </PreviewComponents>
      <PreviewComponents title="10 stars">
        <StarRating
          title="Rating 10 stars"
          initialRating={rating2}
          maxStars={10}
          onChange={handleChangeRating2}
          name="10-star"
          size="medium"
        />
      </PreviewComponents>
      <PreviewComponents title="Sizes and precise mod" direction="vertical" isCentering>
        <StarRating
          title="Rating small size"
          initialRating={rating3}
          maxStars={5}
          onChange={handleChangeRating3}
          name="small"
          size="small"
          isPrecise
        />
        <StarRating
          title="Rating medium size"
          initialRating={rating4}
          maxStars={5}
          onChange={handleChangeRating4}
          name="medium"
          size="medium"
          isPrecise
        />
        <StarRating
          title="Rating large size"
          initialRating={rating5}
          maxStars={5}
          onChange={handleChangeRating5}
          name="large"
          size="large"
          isPrecise
        />
      </PreviewComponents>
      <PreviewComponents title="Readonly">
        <StarRating
          title="Rating"
          initialRating={avgRating}
          maxStars={5}
          onChange={() => undefined}
          name="rating"
          isReadonly
        />
        {avgRating}
      </PreviewComponents>
      <PreviewComponents title="Disabled">
        <StarRating
          title="Rating"
          initialRating={avgRating}
          maxStars={5}
          onChange={() => undefined}
          name="rating"
          isDisabled
        />
        {avgRating}
      </PreviewComponents>
    </div>
  );
};

export default StarRatingPage;
