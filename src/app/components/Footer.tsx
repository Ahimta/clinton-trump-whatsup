import * as React from 'react';

const CNNCredits = () => {
  return (<p>
    Articles courtesy of the <a href='http://edition.cnn.com/us' rel='noopener' target='_blank'>CNN U.S Politics</a> page
  </p>);
};

const Copyrights = () => {
  return (<p>
    <a href='https://linkedin.com/in/ahimta' rel='noopener' target='_blank'>&copy; 2017 Abdullah Alansari</a>
  </p>);
};

const FlaticonCredits = () => {
  return (<p>
    Some icons made by&nbsp;
    <a href='http://www.flaticon.com/authors/roundicons' rel='noopener' target='_blank' title='Roundicons'>
      Roundicons
    </a>&nbsp;
    from <a href='http://www.flaticon.com' rel='noopener' target='_blank' title='Flaticon'>www.flaticon.com</a>&nbsp;
    are licensed by&nbsp;
    <a href='http://creativecommons.org/licenses/by/3.0/' rel='noopener' target='_blank'
      title='Creative Commons BY 3.0'>
      CC 3.0 BY
    </a>
  </p>);
};

export default function Footer() {
  return (<footer className='text-center'>
    <FlaticonCredits />
    <CNNCredits />
    <Copyrights />
  </footer>);
}
