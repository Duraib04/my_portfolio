import { useEffect, useState, useRef } from "react";

const MinecraftBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate terrain blocks
  const generateTerrain = () => {
    const blocks: JSX.Element[] = [];
    const terrainHeight = [3, 4, 5, 4, 6, 5, 4, 3, 5, 6, 7, 6, 5, 4, 5, 6, 5, 4, 3, 4, 5, 4, 3, 4, 5, 6, 5, 4, 3, 2];
    
    terrainHeight.forEach((height, x) => {
      for (let y = 0; y < height; y++) {
        const isGrass = y === height - 1;
        const isDirt = y >= height - 3 && y < height - 1;
        const isStone = y < height - 3;
        
        blocks.push(
          <div
            key={`block-${x}-${y}`}
            className={`absolute minecraft-block ${isGrass ? 'grass' : isDirt ? 'dirt' : 'stone'}`}
            style={{
              left: `${x * 3.33}%`,
              bottom: `${y * 20}px`,
              width: '3.5%',
              height: '20px',
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
        );
      }
    });
    return blocks;
  };

  // Generate floating blocks
  const generateFloatingBlocks = () => {
    const floatingBlocks = [];
    for (let i = 0; i < 15; i++) {
      const size = 15 + Math.random() * 25;
      floatingBlocks.push(
        <div
          key={`float-${i}`}
          className="absolute minecraft-block floating-block"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${10 + Math.random() * 60}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: 0.3 + Math.random() * 0.4,
            animation: `minecraft-float ${8 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px) rotate(${Math.random() * 45}deg)`,
          }}
        />
      );
    }
    return floatingBlocks;
  };

  // Generate clouds (blocky style)
  const generateClouds = () => {
    const clouds = [];
    for (let i = 0; i < 8; i++) {
      const cloudWidth = 80 + Math.random() * 120;
      clouds.push(
        <div
          key={`cloud-${i}`}
          className="minecraft-cloud"
          style={{
            left: `${-10 + i * 15}%`,
            top: `${5 + Math.random() * 15}%`,
            width: `${cloudWidth}px`,
            animation: `cloud-drift ${30 + Math.random() * 20}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        >
          {/* Cloud blocks */}
          {[...Array(5)].map((_, j) => (
            <div
              key={j}
              className="cloud-block"
              style={{
                left: `${j * 20}%`,
                top: j === 0 || j === 4 ? '30%' : '0%',
                width: '25%',
                height: j === 0 || j === 4 ? '70%' : '100%',
              }}
            />
          ))}
        </div>
      );
    }
    return clouds;
  };

  // Generate trees
  const generateTrees = () => {
    const trees = [];
    const treePositions = [5, 15, 35, 55, 75, 90];
    
    treePositions.forEach((pos, i) => {
      trees.push(
        <div
          key={`tree-${i}`}
          className="minecraft-tree"
          style={{
            left: `${pos}%`,
            bottom: '120px',
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        >
          {/* Tree trunk */}
          <div className="tree-trunk" />
          {/* Tree leaves */}
          <div className="tree-leaves">
            {[...Array(9)].map((_, j) => (
              <div key={j} className="leaf-block" style={{
                left: `${(j % 3) * 33.33}%`,
                top: `${Math.floor(j / 3) * 33.33}%`,
              }} />
            ))}
          </div>
        </div>
      );
    });
    return trees;
  };

  // Generate ores/crystals in background
  const generateOres = () => {
    const ores = [];
    for (let i = 0; i < 20; i++) {
      const oreType = Math.random() > 0.5 ? 'diamond' : Math.random() > 0.5 ? 'gold' : 'redstone';
      ores.push(
        <div
          key={`ore-${i}`}
          className={`minecraft-ore ${oreType}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${40 + Math.random() * 50}%`,
            animation: `ore-sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      );
    }
    return ores;
  };

  return (
    <div className="minecraft-world">
      {/* Sky gradient */}
      <div className="minecraft-sky" />
      
      {/* Stars (for depth) */}
      <div className="minecraft-stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="pixel-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Moon/Sun */}
      <div 
        className="minecraft-sun"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      />

      {/* Clouds */}
      {generateClouds()}

      {/* Floating blocks */}
      {generateFloatingBlocks()}

      {/* Far mountains */}
      <div className="minecraft-mountains" style={{ transform: `translateY(${scrollY * 0.03}px)` }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="mountain-block"
            style={{
              left: `${i * 5}%`,
              bottom: 0,
              height: `${30 + Math.sin(i * 0.5) * 50 + Math.random() * 20}px`,
            }}
          />
        ))}
      </div>

      {/* Trees */}
      {generateTrees()}

      {/* Ores */}
      {generateOres()}

      {/* Ground terrain */}
      <div className="minecraft-terrain">
        {generateTerrain()}
      </div>

      {/* Bedrock layer */}
      <div className="minecraft-bedrock" />

      {/* Ambient particles */}
      <div className="minecraft-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="mc-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MinecraftBackground;
