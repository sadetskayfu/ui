import { Slider } from "@/shared/ui/Slider";
import { SliderCustomMarker } from "@/shared/ui/Slider";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import styles from "./style.module.scss";

const SliderPage = () => {
  const markers: SliderCustomMarker[] = [
    {
      value: 500,
      label: "500$",
    },
    {
      value: 1050,
      label: "1050$",
    },
    {
      value: 2000,
      label: "2000$",
    },
  ];
  const temperatureMarkers: SliderCustomMarker[] = [
    {
      value: 0,
      label: '0°'
    },
    {
      value: 17,
      label: '17°'
    },
    {
      value: 50,
      label: '50°'
    },
    {
      value: 100,
      label: '100°'
    }
  ]

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Slider</SectionTitle>
        <div className="subsections">
          <PreviewComponents direction="vertical" title="Slider">
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={10} min={0} max={100000} step={1000} isWalkingMarkers/>
            </div>
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Markers">
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={50} min={0} max={100} isVisibleMarkers step={10} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={40} min={0} max={100} isWalkingMarkers step={10} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={50} min={0} max={100} isWalkingMarkers isVisibleMarkers step={10} />
            </div>
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Custom markers">
            <div className={styles["slider"]}>
              <Slider name="price-slider" label="Price slider" initialValue={800} min={500} max={2000} step={100} customMarkers={markers} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="temperature-slider" label="Temperature slider" initialValue={17} min={0} max={100} isWalkingMarkers customMarkers={temperatureMarkers} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="temperature-slider" label="Price slider" initialValue={500} min={500} max={2000} isWalkingMarkers step={100} customMarkers={markers} />
            </div>
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Range slider">
          <div className={styles["slider"]}>
              <Slider name="rangle-slider" label="Range slider" initialValue={[10, 70]} min={0} max={100} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="rangle-slider" label="Range slider" initialValue={[10, 90]} min={0} max={100} isVisibleMarkers step={10} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="rangle-slider" label="Range slider" initialValue={[30, 70]} min={0} max={100} isWalkingMarkers isVisibleMarkers step={10} minRange={10} />
            </div>
            <div className={styles["slider"]}>
              <Slider name="temperature-rangle-slider" label="Temperature range slider" initialValue={[10, 90]} min={0} max={100} isWalkingMarkers step={10} minRange={20} customMarkers={temperatureMarkers} />
            </div>
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Sizes">
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={10} min={0} max={100} size="small" step={10} isVisibleMarkers/>
            </div>
            <div className={styles["slider"]}>
              <Slider name="slider" label="Slider" initialValue={10} min={0} max={100} step={10} isVisibleMarkers/>
            </div>
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Disabled">
            <div className={styles["slider"]}>
              <Slider name="temperature-slider" label="Temperature slider" initialValue={10} min={0} max={100} step={10} isDisabled customMarkers={temperatureMarkers}/>
            </div>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SliderPage;
