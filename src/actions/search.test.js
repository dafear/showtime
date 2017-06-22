import {
	search
} from './search';



describe('search', () => {
	it('Should dispatch Search', () => {
		const term = {
			type: 'SEARCH'
		};

		global.fetch = jest.fn().mockImplementation(() => 
			promise.resolve({
				ok: true,
				json() {
					return search;
				}
			})
	     );
            
            const dispatch = jest.fn();
            return search()(dispatch).then(() => {
            	expect(async).toHaveBeenCalledWith(dispatch);
            	expect(dispatch).toHaveBeenCalledWith(term);
            });

	     });
     });