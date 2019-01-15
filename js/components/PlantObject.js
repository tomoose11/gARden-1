import React, { Component } from 'react';

import {
  ViroNode, Viro3DObject, ViroQuad, ViroMaterials, ViroSpotLight
} from 'react-viro';

const deleteButton = require('../res/deleteButton.png');
const shadowMaterial = require('../res/empty.png');

class PlantObject extends Component {
  state = {
    isInFocus: false
  };

  toggleIsInFocus = () => {
    this.setState(prevState => ({ isInFocus: !prevState.isInFocus }));
  };

  handleDeleteClick = () => {
    const {
      removePlantFromRenderList, plantID, plantName, lowerPlantCounterByType
    } = this.props;
    removePlantFromRenderList(plantID);
    lowerPlantCounterByType(plantName);
  };

  render() {
    const { filesForPlant, plantName } = this.props;
    const { isInFocus } = this.state;
    ViroMaterials.createMaterials({
      [plantName]: {
        shininess: 2.0,
        lightingModel: 'Lambert',
        diffuseTexture: { uri: filesForPlant.texture[0] }
      },
      deleteButton: {
        shininess: 2.0,
        lightingModel: 'Lambert',
        diffuseTexture: deleteButton
      },
      shadowMaterial: {
        lightingModel: 'Lambert',
        diffuseTexture: shadowMaterial
      },
      no1: {
        shininess: 2.0,
        lightingModel: 'Lambert',
        diffuseTexture: { uri: filesForPlant.texture[1] }
      },
      no2: {
        shininess: 2.0,
        lightingModel: 'Lambert',
        diffuseTexture: { uri: filesForPlant.texture[2] }
      },
      no3: {
        shininess: 2.0,
        lightingModel: 'Lambert',
        diffuseTexture: { uri: filesForPlant.texture[3] }
      }
      // no4: {
      //   shininess: 2.0,
      //   lightingModel: 'Lambert',
      //   diffuseTexture: { uri: filesForPlant.texture[5] }
      // }
    });
    return (
      <ViroNode
        position={[0, -1, -1]}
        dragType="FixedToWorld"
        onDrag={() => {}}
        onClick={this.toggleIsInFocus}
      >
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.91]}
          position={[0, 3, 0]}
          color="#ffffff"
          castsShadow
          lightinfluenceBitMask={2}
          shadowMapSize={2048}
          shadowNearZ={2}
          shadowFarZ={5}
          shadowOpacity={0.2}
          intensity={250}
        />

        <Viro3DObject
          source={{ uri: filesForPlant.obj }}
          materials={[plantName, 'no1', 'no2', 'no3']}
          position={[0, 0, 0]}
          scale={filesForPlant.scale}
          type="OBJ"
        />
        {isInFocus && (
          <ViroQuad
            height={0.15}
            width={0.15}
            onClick={this.handleDeleteClick}
            position={[0, 0.7, 0]}
            materials={['deleteButton']}
            transformBehaviors="billboardY"
          />
        )}
        <ViroQuad
          height={5}
          width={5}
          rotation={[-90, 0, 0]}
          position={[0, 0, 0]}
          materials={['shadowMaterial']}
          arShadowReceiver
        />
      </ViroNode>
    );
  }
}

export default PlantObject;
