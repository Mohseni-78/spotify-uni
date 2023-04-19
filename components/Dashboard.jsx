import React, { useEffect, useState } from 'react'
// Imported Components ========>
import Left from './Left'
import Right from './Right'
import Body from './Body'
// Imported Types ==========>
import Player from './Player'
import { useSession } from 'next-auth/react'
import spotifyApi from '@/utils/spotify'
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";

const Dashboard = () => {

    const { data: session } = useSession();
    const { accessToken } = session ;

    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        setShowPlayer(true);
    }, []);

      const chooseTrack = (track) => {
        setPlayingTrack(track);
      };

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Left />
            <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
            <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />

            {showPlayer && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <Player accessToken={accessToken} trackUri={playingTrack} />
                </div>
            )}
        </main>
    )
}

export default Dashboard
