# Learn Next.js

Adding backend **server** codes with API routes.

## Content

- [Getting Started](#getting-started)
- [API Routes Review](#api-routes-review)
- [File-based Review](#file-based-routing-review)

## Getting Started

We must create an `api` folder (which **Next.js** will recognize) inside **pages** folder.

e.g. `/pages/api/feedback/index.js` will not have to export a React component.

We can also access as an endpoint via `http://localhost:3000/api/feedback`

```js
// pages/api/feedback/index.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // * Or we can create and export a function since the following 3 lines of code is duplicated
    // Then we can use the exported function to be called inside `getStaticProps()`
    const filepath = path.join(process.cwd(), 'data', 'feedback.json');
    const filedata = fs.readFileSync(filepath);
    const data = JSON.parse(filedata);

    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4));

    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    // GET endpoint

    // * Or we can create and export a function since the following 3 lines of code is duplicated
    // Then we can use the exported function to be called inside `getStaticProps()`
    const filepath = path.join(process.cwd(), 'data', 'feedback.json');
    const filedata = fs.readFileSync(filepath);
    const data = JSON.parse(filedata);

    res.status(200).json({ feedback: data });
  }
}
```

`pages/index.js`

This example below is just a part of the content.

This file returns a `React` component

```jsx
// pages/index.js
function submitHandler(event) {
  event.preventDefault();

  const email = emailInputRef.current.value;
  const feedback = feedbackInputRef.current.value;

  const reqBody = { email, feedback };

  // * /pages/api/feedback/index.js
  fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
```

## API Routes Review

> **IMPORTANT**: The special folder `api` will be recognized by **Next.js** as your repository for server-side codes where we handle `req` and `res`

| File                                 | Route                                             |
| ------------------------------------ | ------------------------------------------------- |
| `pages/api/feedback/index.js`        | `http://localhost:3000/api/feedback`              |
| `pages/api/feedback/[feedbackId].js` | `http://localhost:3000/api/feedback/{feedbackId}` |
| `pages/api/other.js`                 | `http://localhost:3000/api/other`                 |
| `pages/api/[otherId].js`             | `http://localhost:3000/api/{otherId}`             |

## File Based Routing Review

| File                      | Route                            |
| ------------------------- | -------------------------------- |
| `pages/feedback/index.js` | `http://localhost:3000/feedback` |

## Understanding .bind()

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

This is not part of **React** or **Next.js**.

This implementation is used in `pages/feedback/index.js`

```jsx
export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(feedbackId) {
    fetch(`/api/feedback${feedbackId}`)
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
```
