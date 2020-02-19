import CSS from 'csstype';

export interface SquareBoxType {
    xCord: Number,
    yCord: Number,
    tileStyle: CSS.Properties,
}

export interface PieceType {
    uniqueId: String,
    currentSquare: SquareBoxType,
    letter: String
}

