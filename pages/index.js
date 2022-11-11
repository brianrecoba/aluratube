import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu"
import {StyledTimeline} from "../src/components/Timeline"

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <div>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <Header />
        <Timeline searchValue ={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;



const StyleHeader = styled.div`
  background-color: ${( {theme} ) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-image: url(${config.imgBanner});
  height: 230px;
`;
function Header() {
  return (
    <StyleHeader>
      <StyledBanner/>
      <section className="user-info">
        {/* <img src="" alt="" srcset="" /> */}
        <img
          src={`https://github.com/${config.github}.png`}
          alt={`Foto do ${config.github}`}
          srcset=""
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyleHeader>
  );
}

function Timeline({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistNames) => {
        const videos = props.playlists[playlistNames];

        return (
          <section key={playlistNames}>
            <h2>{playlistNames}</h2>
            <div>
              {videos.filter((video)=>{
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a href={video.url} key={video.url}>
                    <img src={video.thumb} alt="" />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
