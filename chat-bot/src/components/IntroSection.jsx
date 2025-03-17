/**
 * @file IntroSection.jsx
 * @description 공통 메인화면 인트로 문구
 * @author jaeyeol
 * @created 2025-03-11
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-11
 */

import React from 'react'
import '../styles/IntroSection.css'

const IntroSection = () => {
    return (
        <section className="intro">
            <h1>여행, 나만의 이야기</h1>
            <p>
                "모든 여행은 이야기를 만들어갑니다."
                <br/>
                각 여행자의 경험을 통해 나만의 여행 이야기를 써 내려가세요.
                <br/>
                당신만의 특별한 추억을 남겨보세요.
            </p>
        </section>
    )
}

export default IntroSection
