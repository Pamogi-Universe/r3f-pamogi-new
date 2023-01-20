import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
  Hud,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Center, Image } from "@mantine/core";
import * as THREE from "three";
import gsap from "gsap";
// import Waterfall from "./models/Waterfall";
import Trees from "./models/Trees";
import River1 from "./models/River1";
import River2 from "./models/River2";
import River3 from "./models/River3";
import River4 from "./models/River4";
import River5 from "./models/River5";
import River6 from "./models/River6";
import { OrthographicCamera } from "@react-three/drei";
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Button,
  Container,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons";
import { UserButton } from "./interface/UserButton";
import { LinksGroup } from "./interface/LinksGroup";
import { GrOverview } from "react-icons/gr";
import { GiWaterfall } from "react-icons/gi";
import { BsPlusSquareDotted } from "react-icons/bs";
import Waterfall from "./newerModels/Waterfall";
import Hook1 from "./newerModels/Hook1";
import Sub11 from "./newerModels/Sub11";
import Sub12 from "./newerModels/Sub12";
import Sub13 from "./newerModels/Sub13";
import Sub14 from "./newerModels/Sub14";
import Sub15 from "./newerModels/Sub15";
import Tree11 from "./newerModels/Tree11";
import Tree12 from "./newerModels/Tree12";
import Tree13 from "./newerModels/Tree13";
import Tree14 from "./newerModels/Tree14";
import Task111 from "./newerModels/Task111";
import Task112 from "./newerModels/Task112";
import Task113 from "./newerModels/Task113";
import Task114 from "./newerModels/Task114";
import Task115 from "./newerModels/Task115";

import useStore from "./store";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? "rgba(0,0,0,0.2)"
        : "rgba(255,255,255,0.05)",

    paddingBottom: 0,
    position: "absolute",
    zIndex: "10",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function App() {
  // const [mockdata, setMockdata] = useState([
  //   // { label: "Overview", icon: GrOverview },
  //   // {
  //   //   label: "Topic 1",
  //   //   icon: GiWaterfall,
  //   //   initiallyOpened: false,
  //   //   links: [
  //   //     { label: "Subtopic 1", link: "/" },
  //   //     { label: "Subtopic 2", link: "/" },
  //   //   ],
  //   // },
  // ]);
  const mockdata = useStore((state) => state.mockData);
  const setMockData = useStore((state) => state.setMockData);
  const { classes } = useStyles();

  const handleClick = (index) => {
    // setNavIndex(index);
  };
  const [links, setLinks] = useState([]);
  useEffect(() => {
    setLinks(
      mockdata.map((item, index) => (
        <>
          <div onClick={() => handleClick(index)}>
            <LinksGroup index={index} {...item} key={item.label} />
          </div>
        </>
      ))
    );
  }, [mockdata]);

  const handleAddTopic = () => {
    const newTopic = {
      index: mockdata.length,
      label: "Topic " + (mockdata.length + 1),
      icon: GiWaterfall,
      initiallyOpened: false,
      links: [
        // { label: "Subtopic 1", link: "/" },
        // { label: "Subtopic 2", link: "/" },
      ],
      tasks: [],
      subtasks: [],
    };
    setMockData([...mockdata, newTopic]);
    // setNavIndex(mockdata.length);
  };
  const [navIndex, setNavIndex] = useState(0);

  return (
    <>
      <Navbar
        sx={{ backdropFilter: "blur(5px)" }}
        // height={800}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Image src="/pamogi-logo.png" width={100} />
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
          <Center>
            <Button
              onClick={() => handleAddTopic()}
              variant="light"
              color="violet"
              rightIcon={<BsPlusSquareDotted color="violet" />}
              disabled={mockdata.length >= 5}
            >
              Add Topic
            </Button>
          </Center>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="/mogi.jpg"
            name="Pamogi Bot"
            email="pamogi@pamogi.com"
          />
        </Navbar.Section>
      </Navbar>
      <Canvas
        gl={{ logarithmicDepthBuffer: true }}
        shadows
        camera={{
          position: [15, 15, 10],
          fov: 25,
        }}
      >
        <Scene navIndex={navIndex} mockdata={mockdata} />
      </Canvas>
    </>
  );
}

const Scene = (props) => {
  useEffect(() => {
    setTargetPosition([
      0 + props.navIndex * 5,
      -1.85,
      0 - props.navIndex * 2.5,
    ]);
    setIsMoving(true);
  }, [props.navIndex]);
  const [targetPosition, setTargetPosition] = useState([0, -1.85, 0]);
  const [waterfalls, setWaterfalls] = useState([]);
  const [isMoving, setIsMoving] = useState(true);
  const handleClick = (index) => {
    setTargetPosition([0 + index * 5, -1.85, 0 - index * 2.5]);
    setIsMoving(true);
  };
  const [branchOne, setBranchOne] = useState();
  const [branchTwo, setBranchTwo] = useState();
  const [branchThree, setBranchThree] = useState();
  const [branchFour, setBranchFour] = useState();
  const [branchFive, setBranchFive] = useState();
  const [subTasks, setSubTasks] = useState();
  const [subTasks2, setSubTasks2] = useState();
  const [subTasks3, setSubTasks3] = useState();
  const [subTasks4, setSubTasks4] = useState();
  const [subTasks5, setSubTasks5] = useState();
  const [subsubTasks, setSubsubTasks] = useState();
  const [subsubTasks2, setSubsubTasks2] = useState();
  const [subsubTasks3, setSubsubTasks3] = useState();
  const [subsubTasks4, setSubsubTasks4] = useState();
  const [subsubTasks5, setSubsubTasks5] = useState();
  useEffect(() => {
    console.log(props.mockdata);
    if (
      props.mockdata.length === 1 ||
      props.mockdata.length === 2 ||
      props.mockdata.length === 3 ||
      props.mockdata.length === 4 ||
      props.mockdata.length === 5
    ) {
      if (props.mockdata[0].tasks.length === 1) {
        setSubTasks(
          <>
            <Tree11 />
          </>
        );
      }
      if (props.mockdata[0].tasks.length === 2) {
        setSubTasks(
          <>
            <Tree11 /> <Tree12 />
          </>
        );
      }
      if (props.mockdata[0].tasks.length === 3) {
        setSubTasks(
          <>
            <Tree11 /> <Tree12 />
            <Tree13 />
          </>
        );
      }
      if (props.mockdata[0].tasks.length === 4) {
        setSubTasks(
          <>
            <Tree11 /> <Tree12 />
            <Tree13 /> <Tree14 />
          </>
        );
      }
      setBranchOne(<Hook1 />);
      if (props.mockdata[0].links.length === 1) {
        setBranchOne(
          <>
            <Hook1 />
            <Sub11 />
          </>
        );
      }
      if (props.mockdata[0].links.length === 2) {
        setBranchOne(
          <>
            <Hook1 />
            <Sub11 />
            <Sub12 />
          </>
        );
      }
      if (props.mockdata[0].links.length === 3) {
        setBranchOne(
          <>
            <Hook1 />
            <Sub11 />
            <Sub12 />
            <Sub13 />
          </>
        );
      }
      if (props.mockdata[0].links.length === 4) {
        setBranchOne(
          <>
            <Hook1 />
            <Sub11 />
            <Sub12 />
            <Sub13 />
            <Sub14 />
          </>
        );
      }
      if (props.mockdata[0].links.length === 5) {
        console.log("af;alsdjf");
        setBranchOne(
          <>
            <Hook1 />
            <Sub11 />
            <Sub12 />
            <Sub13 />
            <Sub14 />
            <Sub15 />
          </>
        );
      }
    }
    if (
      props.mockdata.length === 2 ||
      props.mockdata.length === 3 ||
      props.mockdata.length === 4 ||
      props.mockdata.length === 5
    ) {
      if (props.mockdata[1].tasks.length === 1) {
        setSubTasks2(
          <group position={[14, 0, 0]}>
            <Tree11 />
          </group>
        );
      }
      if (props.mockdata[1].tasks.length === 2) {
        setSubTasks2(
          <>
            <group position={[14, 0, 0]}>
              <Tree11 /> <Tree12 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].tasks.length === 3) {
        setSubTasks2(
          <>
            <group position={[14, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].tasks.length === 4) {
        setSubTasks2(
          <>
            <group position={[14, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 /> <Tree14 />
            </group>
          </>
        );
      }
      setBranchTwo(
        <>
          <group position={[14, 0, 0]} rotation-x={Math.PI}>
            <Hook1 />
          </group>
        </>
      );
      if (props.mockdata[1].links.length === 1) {
        setBranchTwo(
          <>
            <group position={[14, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].links.length === 2) {
        setBranchTwo(
          <>
            <group position={[14, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].links.length === 3) {
        setBranchTwo(
          <>
            <group position={[14, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].links.length === 4) {
        setBranchTwo(
          <>
            <group position={[14, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
            </group>
          </>
        );
      }
      if (props.mockdata[1].links.length === 5) {
        setBranchTwo(
          <>
            <group position={[14, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
              <Sub15 />
            </group>
          </>
        );
      }
    }
    if (
      props.mockdata.length === 3 ||
      props.mockdata.length === 4 ||
      props.mockdata.length === 5
    ) {
      if (props.mockdata[2].tasks.length === 1) {
        setSubTasks3(
          <group position={[27, 0, 0]}>
            <Tree11 />
          </group>
        );
      }
      if (props.mockdata[2].tasks.length === 2) {
        setSubTasks3(
          <>
            <group position={[27, 0, 0]}>
              <Tree11 /> <Tree12 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].tasks.length === 3) {
        setSubTasks3(
          <>
            <group position={[27, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].tasks.length === 4) {
        setSubTasks3(
          <>
            <group position={[27, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 /> <Tree14 />
            </group>
          </>
        );
      }
      setBranchThree(
        <>
          <group position={[27, 0, 0]}>
            <Hook1 />
          </group>
        </>
      );
      if (props.mockdata[2].links.length === 1) {
        setBranchThree(
          <>
            <group position={[27, 0, 0]}>
              <Hook1 />
              <Sub11 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].links.length === 2) {
        setBranchThree(
          <>
            <group position={[27, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].links.length === 3) {
        setBranchThree(
          <>
            <group position={[27, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].links.length === 4) {
        setBranchThree(
          <>
            <group position={[27, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
            </group>
          </>
        );
      }
      if (props.mockdata[2].links.length === 5) {
        setBranchThree(
          <>
            <group position={[27, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
              <Sub15 />
            </group>
          </>
        );
      }
    }
    if (props.mockdata.length === 4 || props.mockdata.length === 5) {
      if (props.mockdata[3].tasks.length === 1) {
        setSubTasks4(
          <group position={[40, 0, 0]}>
            <Tree11 />
          </group>
        );
      }
      if (props.mockdata[3].tasks.length === 2) {
        setSubTasks4(
          <>
            <group position={[40, 0, 0]}>
              <Tree11 /> <Tree12 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].tasks.length === 3) {
        setSubTasks4(
          <>
            <group position={[40, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].tasks.length === 4) {
        setSubTasks4(
          <>
            <group position={[40, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 /> <Tree14 />
            </group>
          </>
        );
      }
      setBranchFour(
        <>
          <group position={[40, 0, 0]} rotation-x={Math.PI}>
            <Hook1 />
          </group>
        </>
      );
      if (props.mockdata[3].links.length === 1) {
        setBranchFour(
          <>
            <group position={[40, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].links.length === 2) {
        setBranchFour(
          <>
            <group position={[40, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].links.length === 3) {
        setBranchFour(
          <>
            <group position={[40, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].links.length === 4) {
        setBranchFour(
          <>
            <group position={[40, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
            </group>
          </>
        );
      }
      if (props.mockdata[3].links.length === 5) {
        setBranchFour(
          <>
            <group position={[40, 0, 0]} rotation-x={Math.PI}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
              <Sub15 />
            </group>
          </>
        );
      }
    }
    if (props.mockdata.length === 5) {
      if (props.mockdata[4].tasks.length === 1) {
        setSubTasks5(
          <group position={[53.5, 0, 0]}>
            <Tree11 />
          </group>
        );
      }
      if (props.mockdata[4].tasks.length === 2) {
        setSubTasks5(
          <>
            <group position={[53.5, 0, 0]}>
              <Tree11 /> <Tree12 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].tasks.length === 3) {
        setSubTasks5(
          <>
            <group position={[53.5, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].tasks.length === 4) {
        setSubTasks5(
          <>
            <group position={[53.5, 0, 0]}>
              <Tree11 /> <Tree12 />
              <Tree13 /> <Tree14 />
            </group>
          </>
        );
      }
      setBranchFive(
        <>
          <group position={[53.5, 0, 0]}>
            <Hook1 />
          </group>
        </>
      );
      if (props.mockdata[4].links.length === 1) {
        setBranchFive(
          <>
            <group position={[53.5, 0, 0]}>
              <Hook1 />
              <Sub11 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].links.length === 2) {
        setBranchFive(
          <>
            <group position={[53.5, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].links.length === 3) {
        setBranchFive(
          <>
            <group position={[53.5, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].links.length === 4) {
        setBranchFive(
          <>
            <group position={[53.5, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
            </group>
          </>
        );
      }
      if (props.mockdata[4].links.length === 5) {
        setBranchFive(
          <>
            <group position={[53.5, 0, 0]}>
              <Hook1 />
              <Sub11 />
              <Sub12 />
              <Sub13 />
              <Sub14 />
              <Sub15 />
            </group>
          </>
        );
      }
    }
  }, [props.mockdata]);

  const dummyRef = useRef();
  let vec = new THREE.Vector3();

  useFrame((state, delta) => {
    if (isMoving) {
      gsap.to(dummyRef.current.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 2,
      });
      gsap.to(state.camera.position, {
        x: dummyRef.current.position.x + 15,
        y: dummyRef.current.position.y + 15.5,
        z: dummyRef.current.position.z + 15,
        duration: 2,
      });
      setIsMoving(false);
    }
    state.camera.lookAt(dummyRef.current.position);
  });

  return (
    <>
      <group position={[0, -1.85, 0]} scale={0.3}>
        <Waterfall />
        {branchOne}
        {branchTwo}
        {branchThree}
        {branchFour}
        {branchFive}
        {subTasks}
        {subTasks2}
        {subTasks3}
        {subTasks4}
        {subTasks5}
      </group>
      {/* {waterfalls} */}

      <mesh ref={dummyRef}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          attach="material"
          color="black"
        />
      </mesh>

      <pointLight position={[0, 10, 0]} intensity={1} />

      <Grid
        renderOrder={-1}
        position={[0, -1.85, 0]}
        infiniteGrid={true}
        cellSize={0.5}
        cellThickness={0.6}
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={80}
      />
      <OrbitControls
        enablePan={false}
        zoomSpeed={0.3}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2}
      />
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={2} mipmapBlur />
      </EffectComposer>
      <Environment background preset="sunset" blur={0.8} />
    </>
  );
};
