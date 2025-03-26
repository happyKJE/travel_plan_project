import React from "react";
import {Link} from "react-router-dom";

const MyTravelPlans = (myPlans) => {

    return (
        <section className="plans-section">
            <h3>나의 여행 일정</h3>
            {myPlans.myPlans.length > 0 ?
                (
                    <ul>
                        {myPlans.myPlans.map(plan => (
                            <li key={plan.id}>
                                <strong>{plan.title}</strong> <br /> {plan.date}
                            </li>
                        ))}
                    </ul>
                ) :
                (
                    <>
                        <p>등록된 여행 일정이 없습니다.</p>
                        <Link to={'/'} >여행일정 만들러 가기</ Link>
                    </>
                )}
        </section>
    );
};

export default MyTravelPlans;