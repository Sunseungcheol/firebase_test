import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { InnerBoxStyled } from "../commonStyled";
import Message from "../components/Message";
import WriteMsg from "../components/WriteMsg";
import { dbService } from "../firebase";

const Home = ({ userObj }) => {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    //메세지 데이터 불러오기
    const q = query(
      collection(dbService, "message"),
      orderBy("createDate", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMsgs(newArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userObj.displayName === null) {
      window.location.href = "firebase_test/#/Profile";
    }
  }, [userObj]);

  return (
    <InnerBoxStyled>
      <WriteMsg dbService={dbService} userObj={userObj} />
      <Message data={msgs} userObj={userObj} />
    </InnerBoxStyled>
  );
};

export default Home;
