import { Slider } from '@/shared/ui/Slider'
import Sliderr from '@/shared/ui/Sliderr/Sliderr'
import styles from './style.module.scss'
import { useState } from 'react';
import VolumeSlider from '@/shared/ui/SliderNew/VolumeSlider';

const SliderPage = () => {
    const [sliderValue, setSliderValue] = useState(750);

    return (
        <section className={styles['page']}>
            Slider Page
            <Slider
            min={0}
            max={1000}
            step={100}
            initialValue={[0, 0]}
            onChange={setSliderValue}
            />
            <Sliderr min={0} max={100} step={1} onChange={setSliderValue} initialValue={sliderValue}/>
            <VolumeSlider/>
      
        </section>
    )
}

export default SliderPage