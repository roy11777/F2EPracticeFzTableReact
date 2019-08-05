import React from 'react'

class Mainpage extends React.Component {
  constructor() {
    super()
    // 預設banner開啟狀態
    this.state = {
      Info: [],
      // M版時每次點擊往前往後移動幾格儲存格
      slide: 2, // [number]
      // M版時一個畫面show幾格儲存格
      show: 3, // [number](1~4)
      // 設定花多久時間移動完成(0.3 0.6 1.0)
      speed: 0.3, // [number]
    }
  }

  componentDidMount = () => {
    try {
      fetch('/data/ticketInfo.json')
        .then(res => res.json())
        .then(obj => {
          this.setState({ Info: obj.data[0].data })
          console.log(this.state.Info)
        })
    } catch (e) {
      console.log(e)
    }
  }

  tableContentMouseEnter = e => {
    e.currentTarget.classList.add('hover')
  }
  tableContentMouseLeave = e => {
    e.currentTarget.classList.remove('hover')
  }
  // 資料,class,index
  handleAlignInicator = (index, ele, e) => {
    const forAllselect = document.querySelectorAll('.forAllselect')

    // 不同列的變色
    function controlAllEle() {
      for (let i = 0; i < forAllselect.length; i++) {
        // 在觸發變色前先將所有上一狀態的顏色清除
        forAllselect[i].classList.remove('alignInicator', 'active')
        // 與點到的di於不同列相同index的變色
        if (i % 7 === index) {
          forAllselect[i].classList.add('alignInicator')
        }
      }
    }
    controlAllEle()

    // 相同列的變色
    // 用currentTarget可選到當前綁定的元素不會選到子元素
    e.currentTarget.classList.add('active')
    const rowBgSelect = e.currentTarget.parentNode.childNodes
    for (let i = 0; i < rowBgSelect.length; i++) {
      rowBgSelect[i].classList.add('alignInicator')
    }
  }

  handleSlideLeft = () => {
    const backDateContainer = document.querySelectorAll('.backDateContainer')
    const priceContainer = document.querySelectorAll('.priceContainer')
    const leftButton = document.querySelector('.leftButton')
    const rightButton = document.querySelector('.rightButton')
    let currentslide = Number(priceContainer[0].classList[2].split('').pop())
    const nowshow = this.state.show
    const slideQty = this.state.slide
    let maxSlide = 5

    switch (nowshow) {
      case 1:
        maxSlide = 6
        break
      case 3:
        maxSlide = 4
        break
      case 4:
        maxSlide = 3
        break
      default:
        maxSlide = 5
    }

    if (currentslide < 7 - this.state.show) {
      function controlAllEle(e) {
        for (let i = 0; i < e.length; i++) {
          // // 在觸發變色前先將所有上一狀態的顏色清除Y
          // console.log(e[i].classList)
          e[i].classList.remove('slide' + currentslide)
          e[i].classList.add(
            'slide' +
              // 如果超過滑動上限則固定在最大滑動限度slide
              (slideQty + currentslide >= (nowshow === 4 ? 3 : 6)
                ? maxSlide
                : slideQty + currentslide)
          )
        }
      }
      controlAllEle(priceContainer)
      controlAllEle(backDateContainer)
    }
    console.log(slideQty + currentslide)
    if (slideQty + currentslide >= maxSlide) {
      leftButton.classList.add('d-none')
      if (nowshow + slideQty > 6) {
        rightButton.classList.remove('d-none')
      }
    } else {
      rightButton.classList.remove('d-none')
    }
  }
  handleSlideRight = () => {
    const backDateContainer = document.querySelectorAll('.backDateContainer')
    const priceContainer = document.querySelectorAll('.priceContainer')
    const rightButton = document.querySelector('.rightButton')
    const leftButton = document.querySelector('.leftButton')
    const currentslide = Number(priceContainer[0].classList[2].split('').pop())
    const nowshow = this.state.show
    const slideQty = this.state.slide
    console.log(currentslide - slideQty)
    if (currentslide > 0) {
      function controlAllEle(e) {
        for (let i = 0; i < e.length; i++) {
          // // 在觸發變色前先將所有上一狀態的顏色清除Y
          // console.log(e[i].classList)
          e[i].classList.add(
            'slide' +
              // 如果低於最小滑動上限則卡在小限度slide0
              (currentslide - slideQty < 0 ? 0 : currentslide - slideQty)
          )
          e[i].classList.remove('slide' + currentslide)
        }
      }
      controlAllEle(priceContainer)
      controlAllEle(backDateContainer)
    }
    if (currentslide - slideQty <= 0) {
      rightButton.classList.add('d-none')
      if (nowshow + slideQty > 6) {
        leftButton.classList.remove('d-none')
      }
    } else {
      leftButton.classList.remove('d-none')
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="btn leftButton " onClick={this.handleSlideLeft}>
            <span>&gt;</span>
          </div>
          <div
            className="btn rightButton d-none"
            onClick={this.handleSlideRight}
          >
            <span>&lt;</span>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="firsTd">
                  <div className="categoryContainer">
                    <div className="category">
                      <span>回程</span>
                      <span>去程</span>
                    </div>
                  </div>
                </td>

                <td className={'seconTd cellQty' + this.state.show}>
                  <div
                    className={
                      'backDateContainer' +
                      ' transition-' +
                      this.state.speed.toString().replace('.', '') +
                      ' slide0'
                    }
                  >
                    {this.state.Info.map((ele, index) => (
                      <div
                        className={
                          'dateIntervalTop' +
                          (ele.goDate.indexOf('01/01') !== -1
                            ? ' newYearTop'
                            : ' ') +
                          ' cell' +
                          this.state.show
                        }
                        key={index + +new Date()}
                      >
                        <span className="">{ele.goDate}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              {this.state.Info.map((ele, index) => (
                <tr key={index + +new Date()}>
                  <td className="firsTd">
                    <div className="dateIntervalLeft">
                      <div
                        className={
                          ele.goDate.indexOf('01/01') !== -1
                            ? ' newYearLeft'
                            : ' '
                        }
                      >
                        <span>{ele.goDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className={'seconTd cellQty' + this.state.show}>
                    <div
                      className={
                        'priceContainer' +
                        ' transition-' +
                        this.state.speed.toString().replace('.', '') +
                        ' slide0'
                      }
                    >
                      {ele.detail.map((e, index) => (
                        <div
                          className={
                            (e.cheapest === true ? 'cheapest' : '') +
                            ' forAllselect cell' +
                            this.state.show
                          }
                          key={index + +new Date()}
                          onMouseEnter={this.tableContentMouseEnter}
                          onMouseLeave={this.tableContentMouseLeave}
                          onClick={this.handleAlignInicator.bind(
                            this,
                            index,
                            e
                          )}
                        >
                          <span>
                            {typeof e.price === 'number' ? '$' + e.price : ''}
                          </span>
                          <span>
                            {typeof e.price === 'number'
                              ? '起'
                              : e.price === '--'
                              ? '查看'
                              : '一 一'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default Mainpage
