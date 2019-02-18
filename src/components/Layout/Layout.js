/*eslint no-unused-expressions: "off", eqeqeq: "off", no-sequences: "off"*/
import React, {Fragment} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";
import Head from "../Head";
import styles from "./Layout.module.css";

export default class Layout extends React.PureComponent {
  componentDidMount() {
    if (!window.layoutScriptsInitialized) {
      window.layoutScriptsInitialized = true;
      /*google fonts*/
      window.WebFontConfig = {
        google: {
          families: ['Slabo+27px']
        }
      };

      (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1.5.10/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();

      /*google search*/
      (function () {
        var cx = '014578715170147478038:jt5g2str_f0';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
          '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      })();

      /*analytics*/
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;//noinspection CommaExpressionJS
        i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();//noinspection CommaExpressionJS
        a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

      window.ga('create', 'UA-57969778-1', 'auto');
      window.ga('send', 'pageview');
    } else {
      window.ga('send', 'pageview');
      if (window.google) {
        window.google.search.cse.element.render({div: "gcse-search", tag: 'search'});
      }
    }
  }

  render() {
    const {children, url, isPost, publishDate, image, title, description} = this.props;
    return <Fragment>
      <Head {...{url, isPost, publishDate, image, title, description}} />
      <div itemScope itemType="http://schema.org/WebPage">
        <meta itemProp="typicalAgeRange" content="17-"/>
        <div className={styles.wrapper}>
          <div className={styles.layoutBase}>
            <Header/>

            <div className={styles.contentWrapper}>
              <div className={styles.pageContent}>
                <TopBar/>
                <main id={'page-content__main'} tabIndex="0" className={`${styles.pageContentMain} ${styles.pageContentPadding}`}>
                  {children}
                </main>
                <Footer/>
              </div>
            </div>
          </div>
        </div>
        <noscript>
          <div className="noscript">
            Javascript is disabled for this site in your browser. Please enable it if you want to see site in more
            interactive mode. To learn how click{' '}
            <a className="noscript-text--alternative" href="http://www.youtube.com/watch?v=0w8wr8a0r2M">here</a>{' '}
            or{' '}
            <a className="noscript-text--alternative"
               href="http://www.google.ca/search?q=how+to+enable+javascript&amp;tbs=vid:1">here</a>.
          </div>
        </noscript>
      </div>
    </Fragment>
  }
};