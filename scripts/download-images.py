import requests
import os
import time

base_url = 'https://www.wright.edu/files/vr/cecs/media/'
crawl_delay_seconds = 10

names = [
    "panorama_9358C31D_B049_52A2_41C1_5855D2CE4F01",
    "panorama_94033CDB_B049_37A6_41E0_84D4A06ECF2A",
    # "panorama_9D4221FC_B0C9_3162_41E0_61167E592488",
    # "panorama_9D422A66_B0C9_D36E_41DC_33D58FDFB0FC",
    # "panorama_9D423623_B0C9_52E6_41BD_B75A72E1E08D",
    # "panorama_9D423E6B_B0C9_3366_41E1_B93620879297",
    # "panorama_9D425051_B0C9_CEA2_41BE_8EBB97F00364",
    # "panorama_9D42EC31_B0C9_56E2_41E4_A048DE82FA6A",
    # "panorama_9D42F46A_B0C9_D766_41E5_84DA5E288955",
    # "panorama_9D42F84D_B0C9_3EA2_41D1_B2A267205487",
    # "panorama_9D432036_B0C9_4EEE_41E3_BBEE1D4F3FB2",
    # "panorama_9F2A0B6B_B0C9_3166_41CE_6FCCA0D0F493",
    # "panorama_A0246F5A_AC8E_F41F_41DC_C654914473B2",
    # "panorama_A260800A_AC97_6BFF_41C1_4E4575DC67C7",
    # "panorama_A260A7A3_AC97_742D_41E2_DD8B6062857A",
    # "panorama_A260BBD1_AC97_7C6D_41E3_B20180D2AA90",
    # "panorama_A260C438_AC97_941B_41E0_492BC460E8F1",
    # "panorama_A26159A2_AC95_7C2F_41E3_1332C1EA6A68",
    # "panorama_A261AF42_AC95_946F_4195_98D6280C44D9",
    # "panorama_A261B6CC_AC95_947B_41C4_EF51A4B72D7C",
    # "panorama_A261DB06_AC95_9DF7_41E4_7ADD34107806",
    # "panorama_A261F3DF_AC95_AC15_41D8_A2DE7A0D150D",
    # "panorama_A2621EBD_AC96_9415_41B9_259BE460343A",
    # "panorama_A2622846_AC96_9C77_41E2_9E34A54CBDEB",
    # "panorama_A2623D77_AC96_9415_41B1_ACEA1D9FD6ED",
    # "panorama_A2624320_AC96_AC2B_41E4_BD327E5EA4D6",
    # "panorama_A26275C7_AC96_9475_41E4_14C5B7B7B2DD",
    # "panorama_A2628809_AC96_9BFD_41D5_0B51BD38E5A1",
    # "panorama_A262B690_AC96_B4EB_41AB_0EBD40881F57",
    # "panorama_A262CFD1_AC96_946D_41B9_AB2B9D808641",
    # "panorama_A262DBD4_AC96_BC6B_41E4_91EEFB725FF5",
    # "panorama_A262EE0A_AC96_B7FF_41E1_59D71F7E5F9B",
    # "panorama_A262FCE7_AC96_F435_41CC_AA1102054513",
    # "panorama_A2630C45_AC97_F475_41E3_7F05C5115B4A",
    # "panorama_A2631652_AC97_946F_41C1_A0C9D1AA6A2F",
    # "panorama_A2631795_AC97_9415_41D2_4C1758EFC7E5",
    # "panorama_A2631CDD_AC97_9415_41C2_6CEECC4A5C37",
    # "panorama_A2632018_AC97_6C1B_41D7_D90E89E68985",
    # "panorama_A26329E4_AC97_BC2B_41D4_D24C866DEA84",
    # "panorama_A2632A7E_AC97_9C17_41D5_0F38B1B9D86A",
    # "panorama_A2632E1E_AC97_B417_41CD_29FAE3FAA0A8",
    # "panorama_A2633228_AC97_AC3B_41D4_3FE6C33B1D61",
    # "panorama_A26350B1_AC97_6C2D_41CD_FECE2455EEB7",
    # "panorama_A2636F46_AC96_9474_41BF_43D0A0829878",
    # "panorama_A2638D49_AC97_947D_41A5_74A2A9441535",
    # "panorama_A263A596_AC97_B417_41E0_AE5D6B49EBD7",
    # "panorama_A263AE31_AC97_B42D_41E3_945CA5DAD4F1",
    # "panorama_A263C5BC_AC97_941B_41D2_EF8DCB99AFCF",
    # "panorama_A263C680_AC97_B4EB_41E4_B3C3C85F5731",
    # "panorama_A266009A_AC95_EC1F_41E3_80EF190BC587",
    # "panorama_A26603C5_AC95_EC75_41A5_83482889DC65",
    # "panorama_A2663B5D_AC95_BC15_41E4_38CD33C70BC7",
    # "panorama_A266531D_AC95_AC15_41D9_DD9C3F5E0CD2",
    # "panorama_A266EAAD_AC95_FC35_41CA_5C211FD700CD",
    # "panorama_B8CEAA12_B658_8DE9_41CD_319371961888",
    # "panorama_BCAFA133_AC9A_AC2D_4184_81ECB97E1494",
    # "panorama_CE8810F3_D4FE_8FD3_41D5_92991C8750BE",
]

locations = [
    "Russ 252B",
    "Tissue Culture Facility",
    # "Russ 112D",
    # "Wireless Communication and Networking Lab",
    # "Robotics Lab",
    # "Composite Materials Lab",
    # "VLSI Lab",
    # "Russ 112B",
    # "Unmanned Aerial Vehicles Lab",
    # "Russ 112E",
    # "Russ 420",
    # "Russ 252B",
    # "Russ Engineering",
    # "Ergonomics in Remote Environemnts Lab",
    # "NEC 342",
    # "NEC 344A",
    # "Neuro Engineering Rehabilitation and Degeneration Lab",
    # "Cacioppo Teaching Lab",
    # "Industrial Controls Lab",
    # "Microelectronics Automated Design and Test Lab",
    # "Digital Controls Lab",
    # "Distance Education Lab",
    # "Computer Lab",
    # "Russ 146 Classroom",
    # "Nanomedicine Lab",
    # "Additive Manufacturing Lab",
    # "SCALE-UP Classroom",
    # "Wind Tunnel Lab",
    # "X-Ray Photoelectron Spectroscopy Lab",
    # "Russ 152 Lobby ",
    # "Russ 153 Classroom",
    # "Russ 144 Classroom",
    # "Computer Lab",
    # "Materials Testing Lab",
    # "Biomechanics and Tissue Engineering lab",
    # "Baja Lab",
    # "NEC 350B no tank",
    # "Study Lounge",
    # "NEC 431b",
    # "NEC 434b",
    # "NEC 431c",
    # "NEC 431d",
    # "Russ 133a",
    # "SEM Lab",
    # "Russ 119B",
    # "Human Performance Lab",
    # "Metallography Lab",
    # "Russ 119A",
    # "Russ 117c",
    # "Russ 439",
    # "Digital Design Lab",
    # "Intro to Circuits and Hardware Lab",
    # "Boffin Factory",
    # "Circuits Lab",
    # "Russ Atrium",
    # "NEC Atrium",
    # "Immersive Visualization and Animation Theatre"
]


directions = [
    "_0/u/1/0_0.jpg?v=1617816729222"
    "_0/d/1/0_0.jpg?v=1617816729222"
    "_0/l/1/0_0.jpg?v=1617816729222"
    "_0/r/1/0_0.jpg?v=1617816729222"
    "_0/f/1/0_0.jpg?v=1617816729222"
    "_0/b/1/0_0.jpg?v=1617816729222"
]

for name, loc in zip(names, locations):
    
    os.makedirs(loc)
    
    for d in directions:
        img_data = requests.get(f"{base_url}{name}{d}").content
        
        with open(f'{loc}/{d[4]}.jpg', 'wb') as handler:
            time.sleep(crawl_delay_seconds)
            handler.write(img_data)
            
