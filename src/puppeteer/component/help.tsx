import React from 'react'
import { BOT_NAME, ConfigController } from 'yunzai'
import { createRequire } from 'react-puppeteer'
const require = createRequire(import.meta.url)
export default function Help({ helpData }) {
  return (
    <>
      <div className="container" id="container">
        <div className="head_box">
          <div className="id_text">{BOT_NAME} Genshin</div>
          <h2 className="day_text">
            使用说明 V{ConfigController?.package?.version ?? '4'}
          </h2>
          <img
            className="genshin_logo"
            src={require('../../../public/img/原神.png')}
          />
        </div>
        {helpData.map((val, index) => (
          <div key={index} className="data_box">
            <div className="tab_lable">{val.group}</div>
            <div className="list">
              {val.list.map((item, index) => (
                <div className="item" key={index}>
                  <img
                    className="item-img"
                    src={require(`../../../public/img/icon/${item.icon}.png`)}
                  />
                  <div className="title">
                    <div className="text">{item.title}</div>
                    <div className="dec">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="logo">Created By {BOT_NAME}</div>
      </div>
    </>
  )
}
