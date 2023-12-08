import { useEffect, useState, useCallback } from 'react';
import RefreshIcon from '../assets/desktop/icon-refresh.svg';
import './Quote.css';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [quoteAuthor, setQuoteAuthor] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const fetchQuote = useCallback(() => {
    const url = 'https://type.fit/api/quotes';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const randomNumber = Math.floor(Math.random() * (data.length - 1));
        const author = data[randomNumber].author.split(',')[0];

        setQuote(data[randomNumber]);
        setQuoteAuthor(author);
      })
      .catch((error) => console.error('Error fetching quote:', error));
  }, []);

  const handleClick = () => {
    setIsSpinning(true);

    const quoteContainer = document.querySelector('.quote-container');

    quoteContainer.style.animationName = 'disappear';
    quoteContainer.style.animationDuration = '700ms';

    setTimeout(() => {
      fetchQuote();
      setIsSpinning(false);
      if (quote) {
        quoteContainer.style.animationName = 'appear';
        quoteContainer.style.animationDuration = '1000ms';
      }
    }, 700);
  };

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className='quote-container'>
      {quote && (
        <>
          <div className='quote-text'>
            <span>"{quote.text}"</span>
            <h5>{quoteAuthor}</h5>
          </div>
          <button className='refresh-btn' onClick={handleClick}>
            <img className={isSpinning ? 'spinning' : ''} src={RefreshIcon} alt='refresh icon' />
          </button>
        </>
      )}
    </div>
  );
};

export default Quote;
