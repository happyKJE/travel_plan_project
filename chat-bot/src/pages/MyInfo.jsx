import React, {useState} from "react";

const MyInfo = (userInfo,setUserInfo) => {
    const [editMode, setEditMode] = useState(false);
    const [editedInfo, setEditedInfo] = useState({});

    const handleChange = (e) => {
        setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editedInfo)
            });
            if (res.ok) {
                setUserInfo(editedInfo);
                setEditMode(false);
                alert('✅ 정보 수정 완료!');
            }
        } catch (err) {
            console.error('수정 실패:', err);
        }
    };
    return (
        <section classNameName="profile-section">
            {editMode ? (
            <>
                <input name="name" value={editedInfo.name} onChange={handleChange} />
                <input name="email" value={editedInfo.email} onChange={handleChange} />
                <input name="phone" value={editedInfo.phoneNumber} onChange={handleChange} />
                <button onClick={handleSave}>저장</button>
                <button onClick={() => setEditMode(false)}>취소</button>
            </>
            ):
            (<>
               <section className="profile-section">
                  <div className="profile-row">
                    <span className="label">이름</span>
                    <span className="value">{userInfo.userInfo.name}</span>
                  </div>
                  <div className="profile-row">
                    <span className="label">이메일</span>
                    <span className="value">{userInfo.userInfo.email}</span>
                  </div>
                  <div className="profile-row">
                    <span className="label">전화번호</span>
                    <span className="value">{userInfo.userInfo.phoneNumber}</span>
                  </div>
                </section>
            </>
            )}

        </section>
    );
};

export default MyInfo;