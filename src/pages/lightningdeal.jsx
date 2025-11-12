import React from 'react'
import CategorySlider from '../components/subcategories'
import LightningBanner from '../components/bannerlight'
import LightingCategorySlider from '../components/LightingCategorySlider'

const lightningdeal = () => {
  return (
    <div>
      <LightningBanner/>
      {/* <LightingCategorySlider/> */}
      <CategorySlider/>
    </div>
  )
}

export default lightningdeal