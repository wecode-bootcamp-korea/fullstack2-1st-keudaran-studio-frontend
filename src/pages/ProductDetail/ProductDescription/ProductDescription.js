import React, { Component } from 'react';
import './ProductDescription.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
//import { faHeart } from '@fortawesome/free-regular-svg-icons';

class ProductDescription extends Component {
  render() {
    return (
      <section id="description">
        <h3>조구만 스튜디오 샤프 </h3>
        <p className="price">
          4,000 <em>원</em>
        </p>
        <article id="info">
          <table id="table">
            <colgroup>
              <col width="100"></col>
              <col width="*"></col>
            </colgroup>
            <tbody className="tableBody">
              <tr className="tableCal">
                <td className>상품코드</td>
                <th>004010000006</th>
              </tr>
              <tr className="tableCal">
                <td>적립금</td>
                <th>3 %</th>
              </tr>
              <tr className="tableCal">
                <td>배송비</td>
                <th>배송비 주문금액에 상관없이 배송비가 3,000원 청구됩니다.</th>
              </tr>
              <tr className="tableCal">
                <td>원산지</td>
                <th>한국</th>
              </tr>
              <tr className="tableCal">
                <td>브랜드</td>
                <th>조그만스튜디오</th>
              </tr>
            </tbody>
          </table>
          <dl className="option">
            <dt className="optionText">옵션</dt>
            <dd>
              <select className="optionBox">
                <option value>옵션 선택</option>
                <option value="0">asd</option>
                <option value="1">asd</option>
                <option value="2">asd</option>
              </select>
            </dd>
          </dl>
          <div className="productCount">
            {/*중간 가격 부분*/}
            <span className="productText">브라키오 책갈피</span>
            <div className="countBox">
              <input className="countInput" type="text" value="1" maxLength />
              <span className="countButton">
                <FontAwesomeIcon className="arrowButton" icon={faCaretUp} />
                <FontAwesomeIcon className="arrowButton" icon={faCaretDown} />
              </span>
            </div>
            <p className="changePrice">
              4000<em>원</em>
            </p>
          </div>
          <div className="totalPrice">
            <strong>총 상품 금액</strong>
            <span className="resultPrice">
              4000<em>원</em>
            </span>
          </div>
        </article>
        <footer className="footerButton">
          <p className="buyButton">구매하기</p>
          <p className="bargetButton">장바구니</p>
          <FontAwesomeIcon className="likeButton" icon={faHeart} />
        </footer>
      </section>
    );
  }
}

export default ProductDescription;