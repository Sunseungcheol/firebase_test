import { List } from "antd";
import { Comment } from "antd";
import { Tooltip } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { DATE_FORMAT, TIME_FOR_TODAY } from "../commonFn";
import { dbService } from "../firebase";

const Message = ({ data, userObj }) => {
  const onDeleteClick = async (dataId) => {
    const ok = window.confirm("삭제하시겠습니까");

    const msgRef = doc(dbService, "message", `${dataId}`);
    if (ok) {
      await deleteDoc(msgRef);
    }
  };
  const messageData = data.map((item, i) => {
    return {
      actions: [
        item.user === userObj.uid && (
          <Tooltip key={i}>
            <span onClick={() => onDeleteClick(item.id)}>삭제</span>
          </Tooltip>
        ),
      ],

      author: item.userName,
      avatar: item.profileUrl,
      content: <p>{item.comment}</p>,
      datetime: (
        <Tooltip title={DATE_FORMAT("YYYY-MM-DD", item.createDate)}>
          <span>{TIME_FOR_TODAY(item.createDate)}</span>
        </Tooltip>
      ),
      isOwner: item.user === userObj.uid,
      id: item.id,
    };
  });
  return (
    <>
      <div>
        <List
          className="comment-list"
          header={`${data.length} comments`}
          itemLayout="horizontal"
          dataSource={messageData}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>
    </>
  );
};

export default Message;
