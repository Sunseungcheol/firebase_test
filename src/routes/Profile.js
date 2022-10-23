import { Avatar, Form } from "antd";
import { message } from "antd";
import { Button } from "antd";
import { Input } from "antd";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageService } from "../firebase";
import { Controller, useForm } from "react-hook-form";
import { InnerBoxStyled } from "../commonStyled";

const Profile = ({ userObj }) => {
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
  });
  const uodateProfile = async () => {
    const profileImgDocument = document.getElementById("profile");
    const nameInput = document.getElementById("nameInput");
    const { userName, profileImg } = getValues();

    if (nameInput && nameInput.value.length < 1) {
      alert("이름을 입력해주세요");
      return;
    }
    try {
      let returnUrl = "";

      if (profileImgDocument && profileImgDocument.value) {
        const storageRef = ref(
          storageService,
          `${userObj.uid}/${profileImgDocument.value}`
        );

        const response = await uploadBytes(
          storageRef,
          profileImgDocument.files[0]
        );
        returnUrl = await getDownloadURL(response.ref);
      }

      //데이터 업데이트
      updateProfile(userObj, {
        displayName: userName,
        photoURL: returnUrl === "" ? userObj.photoURL : returnUrl,
      })
        .then(() => {
          message.success("업데이트 완료");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          message.err("업데이트 실패");
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const { Dragger } = Upload;

  // const props = {
  //   name: "file",
  //   multiple: true,
  //   action: "/",
  //   onChange(info) {
  //     const { status } = info.file;
  //     const fileInput = document.querySelector("input[name=mainImgInput]");
  //     if (status !== "uploading") {
  //       //console.log(info.file, info.fileList)
  //       setProfileFile(info.file);
  //       if (fileInput) fileInput.value = info.file.name;
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     const fileInput = document.querySelector("input[name=mainImgInput]");
  //     setProfileFile(e.dataTransfer.files[0]);
  //     if (fileInput) fileInput.value = e.dataTransfer.files[0].name;
  //   },
  // };

  return (
    <InnerBoxStyled>
      <Form name="profileEditForm">
        <div className="form-item">
          <Avatar
            src={userObj.photoURL}
            className="editProfileImg"
            alt="editProfileImg"
          />
          <div className="form-group">
            <span>Name</span>
            <Controller
              control={control}
              name="userName"
              render={({ field: { value, onChange } }) => (
                <>
                  <Input
                    id="nameInput"
                    type="text"
                    defaultValue={userObj.displayName}
                    maxLength="20"
                    placeholder="Name"
                    value={value}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </div>
          <div className="form-group">
            <span>ProfileImg</span>
            <Controller
              control={control}
              name="profileImg"
              render={({ field: { value, onChange } }) => (
                <>
                  {/* <Input
                className="input"
                id="mainImgInput"
                type="hidden"
                placeholder="Please enter the mainImageName."
                value={value}
                onChange={onChange}
              />
              <Dragger {...props} maxCount={1}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger> */}
                  <Input
                    id="profile"
                    name="profile"
                    type="file"
                    accept="image/*"
                    value={value}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </div>
          <div className="form-btn">
            <Button onClick={uodateProfile}>설정하기</Button>
          </div>
        </div>
      </Form>
    </InnerBoxStyled>
  );
};

export default Profile;
