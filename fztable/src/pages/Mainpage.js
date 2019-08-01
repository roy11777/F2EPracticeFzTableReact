import React from 'react'

class Mainpage extends React.Component {
  constructor() {
    super()
    // 預設banner開啟狀態
    this.state = {
      Info: [],
      goAndBackDate: [],
    }
  }

  componentDidMount = () => {
    try {
      fetch('/data/ticketInfo.json')
        .then(res => res.json())
        .then(obj => {
          // console.log(obj.data[0])
          this.setState({ Info: obj.data[0].data })
          console.log(this.state.Info)
          // return obj
        })
      // .then(dataObj => {
      //   console.log(dataObj)
      //   // 裝去程所有日期選項
      //   const godateArr = []
      //   dataObj.data[0].data.forEach(element => {
      //     godateArr.push(element.goDate)
      //   })
      //   this.setState({ goAndBackDate: godateArr })
      //   console.log(this.state.goAndBackDate)
      // })
    } catch (e) {
      // console.log("123")
      console.log(e)
    }
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <table>
            <tbody>
              <tr>
                <td className="category">
                  <span>回程</span>
                  <span>去程</span>
                </td>
                {this.state.Info.map((ele, index) => (
                  <td className="dateIntervalTop" key={index + +new Date()}>
                    {ele.goDate}
                  </td>
                ))}
              </tr>
              {this.state.Info.map((ele, index) => (
                <tr key={index + +new Date()}>
                  {/* 一定要用TD包ele不可單純用寫在這裡 */}
                  <td className="dateIntervalLeft">{ele.goDate}</td>
                  {ele.detail.map((e, index) => (
                    <td
                      className={e.cheapest === true ? 'cheapest' : ''}
                      key={index + +new Date()}
                    >
                      {typeof e.price === 'number' ? '$' + e.price : ''}
                      <span>
                        {typeof e.price === 'number'
                          ? '起'
                          : e.price === '--'
                          ? '查看'
                          : ''}
                      </span>
                    </td>
                  ))}
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
