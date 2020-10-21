import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import "./index.css"
// 角标
import chapterOpen from '../../assets/img/start/chapter-open.png';
import chapterDisable from '../../assets/img/start/chapter-disable.png';
// 角色
import chapterPicture1 from '../../assets/img/start/chapter-picture-1.png';
import chapterPicture2 from '../../assets/img/start/chapter-picture-2.png';
import chapterPicture3 from '../../assets/img/start/chapter-picture-3.png';
import chapterPicture4 from '../../assets/img/start/chapter-picture-4.png';
import chapterPicture5 from '../../assets/img/start/chapter-picture-5.png';
import chapterPicture6 from '../../assets/img/start/chapter-picture-6.png';
// 序号
import chapterIndex1 from '../../assets/img/start/chapter-index-1.png';
import chapterIndex2 from '../../assets/img/start/chapter-index-2.png';
import chapterIndex3 from '../../assets/img/start/chapter-index-3.png';
import chapterIndex4 from '../../assets/img/start/chapter-index-4.png';
import chapterIndex5 from '../../assets/img/start/chapter-index-5.png';
import chapterIndex6 from '../../assets/img/start/chapter-index-6.png';

const Referral: React.FC = () => {

  useEffect(() => {
  })

  return (
    <div className="start-page">
        <div style={{ background: '#343a40' }} className="start-chapter">
          <StyledLink to={`/home`}>
            <div className="start-chapter-subscript">
              <img src={chapterOpen} alt="open" />
            </div>
            <div className="start-chapter-cover start-chapter-open">
              <h1 className="start-chapter-cover-title">
                East China Sea
              </h1>
              <img className="start-chapter-cover-role" src={chapterPicture1} alt="chapter" />
              <img className="start-chapter-cover-index" src={chapterIndex1} alt="index" />
            </div>
          </StyledLink>
        </div>
      <div style={{ background: '#f9bb44' }} className="start-chapter">
        <div className="start-chapter-subscript">
          <img src={chapterDisable} alt="open" />
        </div>
        <div className="start-chapter-cover start-chapter-disable">
          <h1 className="start-chapter-cover-title">
            Alabastan
          </h1>
          <img className="start-chapter-cover-role" src={chapterPicture2} alt="chapter" />
          <img className="start-chapter-cover-index" src={chapterIndex2} alt="index" />
        </div>
      </div>
      <div style={{ background: '#d46888' }} className="start-chapter">
        <div className="start-chapter-subscript">
          <img src={chapterDisable} alt="open" />
        </div>
        <div className="start-chapter-cover start-chapter-disable">
          <h1 className="start-chapter-cover-title">
            Sky Island
          </h1>
          <img className="start-chapter-cover-role" src={chapterPicture3} alt="chapter" />
          <img className="start-chapter-cover-index" src={chapterIndex3} alt="index" />
        </div>
      </div>
      <div style={{ background: '#7da4bb' }} className="start-chapter">
        <div className="start-chapter-subscript">
          <img src={chapterDisable} alt="open" />
        </div>
        <div className="start-chapter-cover start-chapter-disable">
          <h1 className="start-chapter-cover-title">
            Judicial Island
          </h1>
          <img className="start-chapter-cover-role" src={chapterPicture4} alt="chapter" />
          <img className="start-chapter-cover-index" src={chapterIndex4} alt="index" />
        </div>
      </div>
      <div style={{ background: '#6d757d' }} className="start-chapter">
        <div className="start-chapter-subscript">
          <img src={chapterDisable} alt="open" />
        </div>
        <div className="start-chapter-cover start-chapter-disable">
          <h1 className="start-chapter-cover-title">
            Banaro Island
          </h1>
          <img className="start-chapter-cover-role" src={chapterPicture5} alt="chapter" />
          <img className="start-chapter-cover-index" src={chapterIndex5} alt="index" />
        </div>
      </div>
      <div style={{ background: '#244f75' }} className="start-chapter">
        <div className="start-chapter-subscript">
          <img src={chapterDisable} alt="open" />
        </div>
        <div className="start-chapter-cover start-chapter-disable">
          <h1 className="start-chapter-cover-title">
            Horror Barque
          </h1>
          <img className="start-chapter-cover-role" src={chapterPicture6} alt="chapter" />
          <img className="start-chapter-cover-index" src={chapterIndex6} alt="index" />
        </div>
      </div>
    </div>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default Referral
