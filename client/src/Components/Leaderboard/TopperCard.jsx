import React from 'react';
import styled from 'styled-components';

// position='1' subscript='st' name='Ranjeet Singh' score='1105'

const TopperCard = ( { position, subscript, name, score } ) => {

    const positionSvg = () => {
        switch (position) {
            case '1':
                return <First />;
            case '2':
                return <Second />;
            case '3':
                return <Third />;
            default:
                return null;
        }
    }

    const BarSvg = () => {
        switch (position) {
            case '1':
                return <FirstBar />;
            case '2':
                return <SecondBar />;
            case '3':
                return <ThirdBar />;
            default:
                return null;
        }
    }

    const MedalSvg = () => {
        switch (position) {
            case '1':
                return <FirstMedal />;
            case '2':
                return <SecondMedal />;
            case '3':
                return <ThirdMedal />;
            default:
                return null;
        }
    }

  return (
    <StyledWrapper>
      <div className="cards">
        <div className="outlinePage">
          {positionSvg()}
          <p className="ranking_number">{position}<span className="ranking_word">{subscript}</span></p>
          <div className="splitLine" />
          <svg className="icon userAvatar" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={25} height={25}>
            <path d="M512 0C228.693 0 0 228.693 0 512s228.693 512 512 512 512-228.693 512-512S795.307 0 512 0z m0 69.973c244.053 0 442.027 197.973 442.027 442.027 0 87.04-25.6 168.96-69.973 237.227-73.387-78.507-170.667-133.12-281.6-151.893 69.973-34.133 119.467-105.813 119.467-187.733 0-116.053-93.867-209.92-209.92-209.92s-209.92 93.867-209.92 209.92c0 83.627 47.787 155.307 119.467 187.733-110.933 20.48-208.213 75.093-281.6 153.6-44.373-68.267-69.973-150.187-69.973-238.933 0-244.053 197.973-442.027 442.027-442.027z" fill="#8a8a8a" />
          </svg>
          <p className="userName">{name}</p>
        </div>
        <div className="detailPage">
          {MedalSvg()}
          <div className="gradesBox">
            {BarSvg()}
            <p className="gradesBoxLabel">SCORE</p>
            <p className="gradesBoxNum">{score}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cards {
    position: relative;
    height: 150px;
    transition-duration: 0.5s;
    background: none;
    overflow: hidden;
  }

  .cards:hover {
    height: 270px;
  }

  .cards:hover .outlinePage {
    box-shadow: 0 10px 15px #b1985e;
  }

  .cards:hover .detailPage {
    display: flex;
  }

  .outlinePage {
    position: relative;
    background: linear-gradient(45deg, #fffbf0, #ffdd87);
    width: 300px;
    height: 150px;
    border-radius: 25px;
    transition-duration: 0.5s;
    z-index: 2;
  }

  .detailPage {
    position: relative;
    display: none;
    width: 300px;
    height: 120px;
    background: white;
    top: -20px;
    z-index: 1;
    transition-duration: 1s;
    border-radius: 0 0 25px 25px;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
  }

  .splitLine {
    position: absolute;
    width: 200px;
    height: 10px;
    top: 100px;
    background-image: linear-gradient(
      to right,
      transparent 10%,
      #ffe8a0 20%,
      #f7b733 50%,
      #ffe8a0 70%,
      transparent 90%
    );
    z-index: 1;
  }

  .trophy {
    position: absolute;
    right: 0px;
    top: 4px;
    z-index: 2;
  }

  .ranking_number {
    position: relative;
    color: #ffc64b;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    font-size: 80px;
    left: 20px;
    padding: 0;
    margin: 0;
    top: -5px;
  }

  .ranking_word {
    position: relative;
    font-size: 40px;
    color: #424c50;
  }

  .userAvatar {
    position: absolute;
    bottom: 6px;
    left: 20px;
  }

  .userName {
    position: relative;
    font-weight: 600;
    color: #6b7578;
    left: 55px;
    font-size: 18px;
    top: -2px;
  }

  .medals {
    position: absolute;
    top: 15px;
    right: 5px;
  }

  .gradesBox {
    position: relative;
    height: 75px;
    top: 10px;
    margin-right: 10px;
    margin-left: 15px;
  }

  .gradesIcon {
    position: absolute;
    top: 10px;
  }

  .gradesBoxLabel {
    position: relative;
    display: block;
    margin-left: 60px;
    color: #424c50;
    letter-spacing: 6px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 20px;
    font-weight: 800;
    font-size: 13px;
  }

  .gradesBoxNum {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    display: block;
    font-size: 25px;
    font-weight: 800;
    margin-left: 60px;
    color: #ea9518;
    top: -5px;
  }

  .timeNum {
    color: #6cabf6;
  }

  .slide-in-top {
    animation: slide-in-top 1s cubic-bezier(0.65, 0.05, 0.36, 1) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }`;


const First = () => {
    return (
        <svg className="icon trophy" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={160} height={160}>
            <path d="M469.333333 682.666667h85.333334v128h-85.333334zM435.2 810.666667h153.6c4.693333 0 8.533333 3.84 8.533333 8.533333v34.133333h-170.666666v-34.133333c0-4.693333 3.84-8.533333 8.533333-8.533333z" fill="#ea9518" data-spm-anchor-id="a313x.search_index.0.i10.40193a81WcxQiT" className />
            <path d="M384 853.333333h256a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667H341.333333v-42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#6e4a32" data-spm-anchor-id="a313x.search_index.0.i1.40193a81WcxQiT" className />
            <path d="M213.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256H213.333333zM170.666667 213.333333h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333zM725.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256h-85.333334z m-42.666666-42.666667h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333z" fill="#f4ea2a" data-spm-anchor-id="a313x.search_index.0.i9.40193a81WcxQiT" className />
            <path d="M298.666667 85.333333h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v341.333333a256 256 0 1 1-512 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#f2be45" data-spm-anchor-id="a313x.search_index.0.i5.40193a81WcxQiT" className />
            <path d="M512 469.333333l-100.309333 52.736 19.157333-111.701333-81.152-79.104 112.128-16.298667L512 213.333333l50.176 101.632 112.128 16.298667-81.152 79.104 19.157333 111.701333z" fill="#FFF2A0" />
          </svg>
    );
}

const Second = () => {
    return (
        <svg className="icon trophy" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={160} height={160}>
            <path d="M469.333333 682.666667h85.333334v128h-85.333334zM435.2 810.666667h153.6c4.693333 0 8.533333 3.84 8.533333 8.533333v34.133333h-170.666666v-34.133333c0-4.693333 3.84-8.533333 8.533333-8.533333z" fill="#a8a8a8"/>
            <path d="M384 853.333333h256a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667H341.333333v-42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#6e6e6e"/>
            <path d="M213.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256H213.333333zM170.666667 213.333333h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333zM725.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256h-85.333334z m-42.666666-42.666667h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333z" fill="#d9d9d9"/>
            <path d="M298.666667 85.333333h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v341.333333a256 256 0 1 1-512 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#c0c0c0"/>
            <path d="M512 469.333333l-100.309333 52.736 19.157333-111.701333-81.152-79.104 112.128-16.298667L512 213.333333l50.176 101.632 112.128 16.298667-81.152 79.104 19.157333 111.701333z" fill="#ffffff"/>
        </svg>
    );
}

const Third = () => {
    return (
        <svg className="icon trophy" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={160} height={160}>
            <path d="M469.333333 682.666667h85.333334v128h-85.333334zM435.2 810.666667h153.6c4.693333 0 8.533333 3.84 8.533333 8.533333v34.133333h-170.666666v-34.133333c0-4.693333 3.84-8.533333 8.533333-8.533333z" fill="#c47a39"/>
            <path d="M384 853.333333h256a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667H341.333333v-42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#8a512a"/>
            <path d="M213.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256H213.333333zM170.666667 213.333333h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333zM725.333333 256v85.333333a42.666667 42.666667 0 0 0 85.333334 0V256h-85.333334z m-42.666666-42.666667h170.666666v128a85.333333 85.333333 0 1 1-170.666666 0V213.333333z" fill="#d6964e"/>
            <path d="M298.666667 85.333333h426.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v341.333333a256 256 0 1 1-512 0V128a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#cd8034"/>
            <path d="M512 469.333333l-100.309333 52.736 19.157333-111.701333-81.152-79.104 112.128-16.298667L512 213.333333l50.176 101.632 112.128 16.298667-81.152 79.104 19.157333 111.701333z" fill="#ffdfb0"/>
        </svg>
    );
}


const FirstBar = () => {
    return (
        <svg className="icon gradesIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={60} height={60}>
              <path d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z" fill="#ea9518" data-spm-anchor-id="a313x.search_index.0.i36.40193a81WcxQiT" className />
              <path d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z" fill="#f2be45" data-spm-anchor-id="a313x.search_index.0.i35.40193a81WcxQiT" className />
              <path d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z" fill="#ea9518" data-spm-anchor-id="a313x.search_index.0.i37.40193a81WcxQiT" className />
        </svg>
    );
}

const SecondBar = () => {
    return (
        <svg className="icon gradesIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={60} height={60}>
            <path d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z" fill="#b0b0b0" />
            <path d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z" fill="#d3d3d3" />
            <path d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z" fill="#b0b0b0" />
        </svg>

    );
}

const ThirdBar = () => {
    return (
        <svg className="icon gradesIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={60} height={60}>
            <path d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z" fill="#b87333" />
            <path d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z" fill="#cd7f32" />
            <path d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z" fill="#b87333" />
        </svg>
    );
}

const FirstMedal = () => {
    return (
        <svg className="icon medals slide-in-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
            <path d="M896 42.666667h-128l-170.666667 213.333333h128z" fill="#FF4C4C" />
            <path d="M768 42.666667h-128l-170.666667 213.333333h128z" fill="#3B8CFF" />
            <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1" />
            <path d="M128 42.666667h128l170.666667 213.333333H298.666667z" fill="#FF4C4C" />
            <path d="M256 42.666667h128l170.666667 213.333333h-128z" fill="#3B8CFF" />
            <path d="M384 42.666667h128l170.666667 213.333333h-128z" fill="#FBFBFB" />
            <path d="M298.666667 256h426.666666v213.333333H298.666667z" fill="#E3A815" />
            <path d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#FDDC3A" />
            <path d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" fill="#E3A815" />
            <path d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z" fill="#F5CF41" />
            <path d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z" fill="#D19A0E" />
            <path d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z" fill="#F9D525" />
            <path d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z" fill="#FFF2A0" />
          </svg>
    );
};

const SecondMedal = () => {
    return (
        <svg className="icon medals slide-in-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
            <path d="M896 42.666667h-128l-170.666667 213.333333h128z" fill="#FF4C4C" />
            <path d="M768 42.666667h-128l-170.666667 213.333333h128z" fill="#3B8CFF" />
            <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1" />
            <path d="M128 42.666667h128l170.666667 213.333333H298.666667z" fill="#FF4C4C" />
            <path d="M256 42.666667h128l170.666667 213.333333h-128z" fill="#3B8CFF" />
            <path d="M384 42.666667h128l170.666667 213.333333h-128z" fill="#FBFBFB" />
            <path d="M298.666667 256h426.666666v213.333333H298.666667z" fill="#A0A0A0" />
            <path d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#D3D3D3" />
            <path d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" fill="#BDBDBD" />
            <path d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z" fill="#DADADA" />
            <path d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z" fill="#9E9E9E" />
            <path d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z" fill="#F0F0F0" />
        </svg>
    );
};


const ThirdMedal = () => {
    return (
        <svg className="icon medals slide-in-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={80} height={80}>
            <path d="M896 42.666667h-128l-170.666667 213.333333h128z" fill="#FF4C4C" />
            <path d="M768 42.666667h-128l-170.666667 213.333333h128z" fill="#3B8CFF" />
            <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1" />
            <path d="M128 42.666667h128l170.666667 213.333333H298.666667z" fill="#FF4C4C" />
            <path d="M256 42.666667h128l170.666667 213.333333h-128z" fill="#3B8CFF" />
            <path d="M384 42.666667h128l170.666667 213.333333h-128z" fill="#FBFBFB" />
            <path d="M298.666667 256h426.666666v213.333333H298.666667z" fill="#A65E2E" />
            <path d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#C97D45" />
            <path d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" fill="#B46B3C" />
            <path d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z" fill="#CD8B62" />
            <path d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z" fill="#8E4A24" />
            <path d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z" fill="#F2D2B0" />
        </svg>
    );
};

export default TopperCard;
