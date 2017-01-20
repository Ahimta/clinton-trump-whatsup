import * as React from 'react';
import { FormControl, FormGroup, InputGroup, Radio } from 'react-bootstrap';

interface IProps {
  readonly filter: string;
  readonly isLoading: boolean;
  readonly updateFilterFactory: (filter: string) => () => void;
}

export default function FilterForm({filter, isLoading, updateFilterFactory}: IProps) {
  return (<form className='text-center'>
    <FormGroup>
      <InputGroup>
        <InputGroup.Addon>Number of Articles</InputGroup.Addon>
        <FormControl type='number' value={25} disabled />
      </InputGroup>
    </FormGroup>

    <FormGroup>
      <Radio checked={filter === 'clinton'} disabled={isLoading} onChange={updateFilterFactory('clinton')} inline>Clinton</Radio>
      <Radio checked={filter === 'trump'} disabled={isLoading} onChange={updateFilterFactory('trump')} inline>Trump</Radio>
      <Radio checked={filter === 'both'} disabled={isLoading} onChange={updateFilterFactory('both')} inline>Both</Radio>
      <Radio checked={filter === 'either'} disabled={isLoading} onChange={updateFilterFactory('either')} inline>Either</Radio>
    </FormGroup>
  </form>);
}
