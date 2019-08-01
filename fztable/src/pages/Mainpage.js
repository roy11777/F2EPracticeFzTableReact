import React from 'react'

class Mainpage extends React.Component {
  constructor() {
    super()
    // 預設banner開啟狀態
    this.state = {
      Info: [],
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

  render() {
    return (
      <>
        <div className="wrapper">
          <table>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div className="category">
                      <span>回程</span>
                      <span>去程</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    {this.state.Info.map((ele, index) => (
                      <div
                        className="dateIntervalTop"
                        key={index + +new Date()}
                      >
                        {ele.goDate}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              {this.state.Info.map((ele, index) => (
                <tr key={index + +new Date()}>
                  {/* 一定要用TD包ele不可單純用寫在這裡 */}
                  <td className="dateIntervalLeft">
                    <div>
                      <div>
                        <span>{ele.goDate}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {ele.detail.map((e, index) => (
                        <div
                          className={
                            (e.cheapest === true ? 'cheapest' : '') +
                            ' forAllselect'
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
                          {typeof e.price === 'number' ? '$' + e.price : ''}
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
