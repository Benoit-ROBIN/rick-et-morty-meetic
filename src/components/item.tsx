import * as React from 'react';
import { Item } from 'native-base';

import { Character } from '../store/character/types';

export interface ItemComponentProps {
    character: Character
}

export class ItemComponent extends React.Component<ItemComponentProps, any> {

    constructor(props: ItemComponentProps){
        super(props)
    }

    renderCharacter = () => {

    }

    public render() {
        return (
            <Item>

            </Item>
        );
    }
}
