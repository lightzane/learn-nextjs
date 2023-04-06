import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(feedbackId) {
    fetch(`/api/feedback/${feedbackId}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <>
      {feedbackData && <p>Feedback email: {feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            <span>{item.feedback}</span>
            {/* .bind() allows us to pre-configure this function */}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// ! Next.js function
export async function getStaticProps() {
  // The following line of codes can be imported from `pages/api/feedback.js`
  const filepath = path.join(process.cwd(), 'data', 'feedback.json');
  const filedata = fs.readFileSync(filepath);
  const data = JSON.parse(filedata);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
