import { useState } from 'react';
import FeedbackOptions from 'components/statistics-button/StatisticsButtonList';
import Statistics from 'components/statistics-block/StatisticsList';
import Section from 'components/section/section';
import Notification from 'components/notififcation/Notification';

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  return (
    <div>
      <>
        <Section title="Give feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {countTotalFeedback() > 0 ? (
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    </div>
  );
}

export default App;
