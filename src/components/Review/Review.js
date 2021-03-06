import React from 'react';
import Cookies from 'universal-cookie';
import { API_ENDPOINT } from '../../api';
import './Review.scss';

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      review: '',
      starRating: 0,
      reviewList: [],
      isPolicyDetail: false,
      agreePolicy: { agreePolicyRadio: true, notAgreePolicyRadio: false },
    };
  }

  componentDidMount = () => {
    fetch(`${API_ENDPOINT}/review?id=${this.props.id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ reviewList: data.result });
      });
  };

  removeCookie = async () => {
    new Cookies().remove('user', { path: '/' });
    this.props.toggleIsLogin();
  };

  createNewReview = e => {
    e.preventDefault();
    const { agreePolicy, starRating, review, reviewList } = this.state;
    let id = '';
    if (!this.props.isLogin) return alert('서비스 준비중입니다.');
    if (agreePolicy.notAgreePolicyRadio)
      return alert('약관에 동의가 필요합니다.');
    if (starRating === 0) return alert('별점을 선택해주세요');
    if (review === '') return alert('리뷰 내용을 입력해주세요.');
    if (new Cookies().get('user')) id = new Cookies().get('user').id;

    fetch(`${API_ENDPOINT}/review`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        user: id,
        rating: starRating,
        productId: this.props.id,
        content: review,
        imageUrl: null,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'TOKEN_EXPIRED') {
          alert('로그인 시간이 경과하였습니다. 새로 로그인 해주세요.');
          this.removeCookie();
        }
        const newReviewList = [...reviewList];
        newReviewList.unshift(result.result);
        this.setState({
          reviewList: newReviewList,
          starRating: 0,
          review: '',
          isPolicyDetail: false,
          agreePolicy: { agreePolicyRadio: true, notAgreePolicyRadio: false },
        });
      })
      .catch(e => console.log(e));
    // 비회원 리뷰 기능 구현시 참고
    // this.setState({
    //   reviewList: [
    //     ...this.state.reviewList,
    //     {
    //       id:
    //         reviewList.length > 0
    //           ? reviewList[reviewList.length - 1].id + 1
    //           : 1,
    //       content: this.state.review,
    //       rating: +this.state.starRating,
    //     },
    //   ],
    //   review: '',
    // });
  };

  handelInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  decideStarRating = num => {
    let star = '';
    for (let i = 0; i < num; i++) {
      star += '★';
    }
    return star;
  };

  showPolicyDetail = () => {
    const { isPolicyDetail } = this.state;
    this.setState({ isPolicyDetail: !isPolicyDetail });
  };

  checkPolicyRadio = e => {
    const { agreePolicy } = this.state;
    this.setState({
      agreePolicy: {
        agreePolicyRadio: !agreePolicy.agreePolicyRadio,
        notAgreePolicyRadio: !agreePolicy.notAgreePolicyRadio,
      },
    });
  };

  deleteReview = id => {
    const reviewArr = [...this.state.reviewList].filter(
      review => review.id !== id
    );
    this.setState({ reviewList: reviewArr });
  };

  calculateRating = reviewList => {
    if (reviewList.length === 0) return 0;
    let sumOfRatings = 0;
    for (const review of reviewList) {
      sumOfRatings += review.rating;
    }
    return (sumOfRatings / reviewList.length) * 20;
  };

  render() {
    const { reviewList, isPolicyDetail, agreePolicy } = this.state;
    const { isLogin } = this.props;
    const averageRating = this.calculateRating(reviewList);
    const ratingScore = Math.round((averageRating / 20) * 10) / 10;
    return (
      <div className="Review">
        <div className="reviewInner">
          <div className="reviewRate">
            <div className="userRateWrap">
              <p className="rateTotal">사용자 총 평점</p>
              <p className="totalAmountReview">
                (총<b>{reviewList.length}</b>개 리뷰 기준)
              </p>
            </div>
            <div className="averageRate">
              <div className="wrapStar">
                <div className="starRating">
                  <span
                    className="innerStarRating"
                    style={{ width: `${averageRating}%` }}
                  ></span>
                </div>
                <h2>
                  <b>{ratingScore}</b>
                  /5 점
                </h2>
              </div>
            </div>
          </div>
          <div className="reviewWrite">
            <form className="reviewForm">
              <div className="howManyStars">
                <select
                  name="starRating"
                  className="starSelector"
                  onChange={this.handelInputChange}
                >
                  <option value="0">-- 별점 선택 --</option>
                  <option value="1">★️</option>
                  <option value="2">★★</option>
                  <option value="3">★★★️</option>
                  <option value="4">★★★★️</option>
                  <option value="5">★★★★★</option>
                </select>
              </div>
              <textarea
                className="reviewInput"
                value={this.state.review}
                name="review"
                placeholder="
                크다란을 이용해 주셔서 감사합니다. 리뷰는 품질개선과
                서비스향상에 도움이 됩니다."
                onChange={this.handelInputChange}
              ></textarea>
              <button
                className="reviewSubmitButton"
                onClick={this.createNewReview}
              >
                리뷰 등록
              </button>
            </form>
            {isLogin ? null : (
              <div className="privacyPolicy">
                <div className="privacyTitle">
                  <p className="privacyTitleInner">
                    <b>개인정보수집이용</b>
                    <u onClick={this.showPolicyDetail}>자세히 보기</u>
                  </p>

                  <div className="privacyRadioBox">
                    <input
                      type="radio"
                      name="agree"
                      value="1"
                      checked={agreePolicy.agreePolicyRadio}
                      id="agreePolicyRadio"
                      onChange={this.checkPolicyRadio}
                    />
                    <label className="agreeOrNot" htmlFor="agreePolicyRadio">
                      <b>동의</b>
                    </label>
                    <input
                      type="radio"
                      name="agree"
                      value="0"
                      checked={agreePolicy.notAgreePolicyRadio}
                      id="notAgreePolicyRadio"
                      onChange={this.checkPolicyRadio}
                    />
                    <label className="agreeOrNot" htmlFor="notAgreePolicyRadio">
                      <b>미동의</b>
                    </label>
                  </div>
                </div>
                {isPolicyDetail ? (
                  <table className="privacyTable">
                    <colgroup>
                      <col width="200"></col>
                      <col width="250"></col>
                      <col width="130"></col>
                    </colgroup>
                    <thead className="tableHead">
                      <tr>
                        <th scope="col">목적</th>
                        <th scope="col">항목</th>
                        <th scope="col">보유기간</th>
                      </tr>
                    </thead>
                    <tbody className="tableBody">
                      <tr>
                        <td className="perpose">
                          <div className="privacyTxt">
                            게시판 서비스 제공 / 이용 고객 확인
                          </div>
                        </td>
                        <td className="items">
                          <div className="privacyTxt">
                            이름, 비밀번호, 작성내용, IP주소
                          </div>
                        </td>
                        <td className="hold">
                          <div className="privacyTxt">게시글 삭제시까지</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : null}
                <div className="agreeForFillOut">
                  * 동의하셔야 서비스를 이용하실 수 있습니다.
                </div>
              </div>
            )}
          </div>

          <div className="reviewList">
            {reviewList.length > 0 ? (
              reviewList.map(review => {
                return (
                  <ul className="reviewBlock" key={review.id}>
                    <li className="createdReview">
                      <div className="starsAndData">
                        <span className="stars">
                          {this.decideStarRating(review.rating)}
                        </span>
                        <div className="reviewUserInfo">
                          <span className="userId">{review.username}</span>
                          <span className="createdAt">
                            {review.created_at.slice(0, 10) +
                              ' ' +
                              review.created_at.slice(11, 19)}
                          </span>
                        </div>
                      </div>
                      <div className="reviewContent">
                        <textarea
                          className="reviewContentText"
                          defaultValue={review.content}
                          readOnly
                        ></textarea>
                        <div className="modifyAndDelete">
                          <span
                            onClick={() => {
                              this.deleteReview(review.id);
                            }}
                            className="deleteReview"
                          >
                            [삭제]
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                );
              })
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
