import TProduct from '../../../common/types/TProduct';

interface IStore {
  loading: boolean;
  products?: Array<TProduct>;
  error?: any;
}

export default IStore;
