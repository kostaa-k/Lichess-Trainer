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

    describe('getDefaultLineup', () => {
        it('should return a list of lineups', () => {
            let GetDefaultLineupMock.slice = jest.fn().mockReturnValue([]);
            expect(GetDefaultLineupMock).toHaveReturnedWith([]);    
        })
    })
})
