import { AudioFilled } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { Avatar } from "antd";
import { Comment } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

const WriteMsg = ({ dbService, userObj }) => {
  const [voiceMsg, setVoiceMsg] = useState("");
  const [nowListen, setNowListen] = useState(false);
  //const [value, setValue] = useState("");

  const {
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
  });

  const { comments } = getValues();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setNowListen(false);
      setValue("comments", result);
      setVoiceMsg(result);
    },
  });

  const voiceText = () => {
    setNowListen(true);
    listen({ interimResults: false, lang: "Ko" });
  };

  const { TextArea } = Input;
  const onSubmit = async (event) => {
    event.preventDefault();
    const textAreaElement = document.getElementById("msgBox");

    if (!textAreaElement.value) return;

    try {
      const docRef = await addDoc(collection(dbService, "message"), {
        user: userObj.uid,
        userName: userObj.displayName,
        comment: textAreaElement.value,
        createDate: Date.now(),
        profileUrl: userObj.photoURL,
      });

      setValue("comments", "");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //키보드 이벤트시 포커스
  window.addEventListener("keydown", (e) => {
    const textBox = document.getElementById("msgBox");
    if (textBox) textBox.focus();
  });

  useEffect(() => {
    //음성인식 결과가 있는 경우 음성인식 stop
    stop();
  }, [voiceMsg]);

  const Editor = ({ onSubmit }) => (
    <Form name="commentForm">
      <div className="form-item">
        <Form.Item>
          <Controller
            control={control}
            name="comments"
            render={({ field: { value, onChange } }) => (
              <>
                <TextArea
                  id="msgBox"
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              </>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            //loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            Add Comment
          </Button>
          <Button type="primary" style={{ marginLeft: "7px" }}>
            {nowListen ? (
              <Spin color="#fff" />
            ) : (
              <AudioFilled className="micIcon" onClick={voiceText} />
            )}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <Comment
      avatar={<Avatar src={userObj.photoURL} alt="profileImg" />}
      content={<Editor onSubmit={onSubmit} />}
    />
  );
};

export default WriteMsg;
