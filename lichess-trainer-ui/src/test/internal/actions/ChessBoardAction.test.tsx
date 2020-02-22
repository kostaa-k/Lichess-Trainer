import { isEven, getDefaultLineup } from '../../../internal/actions/ChessBoardAction';

describe('ChessBoardAction', () => {
    describe('isEven', () => {
        it('should return true if even', () => {
            expect(isEven(2)).toEqual(true);
        })
    
        it('should return false if odd', () => {
            expect(isEven(1)).toEqual(false);
        })
    })

    // describe('getDefaultLineup', () => {
    //     let GetDefaultLineupMock: any;
    //     GetDefaultLineupMock = jest.fn();
    //     it('should return a list of lineups', () => {
    //         GetDefaultLineupMock. = jest.fn().mockReturnValue([]);
    //         console.log(GetDefaultLineupMock.slice)
    //         expect(GetDefaultLineupMock).toHaveReturnedWith('somethin');    
    //     })
    // })
})
