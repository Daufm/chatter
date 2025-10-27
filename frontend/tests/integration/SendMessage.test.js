import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatWindow from '../../src/components/ChatWindow';

describe('SendMessage Integration', () => {
  test('displays sent message in chat window', async () => {
    const user = userEvent.setup();
    render(<ChatWindow recipient={{ name: 'Test User' }} />);

    // Initial messages should be present
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();

    // Type a message and send
    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.type(textarea, 'New test message');
    await user.click(sendButton);

    // Check that the new message appears
    expect(screen.getByText('New test message')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();

    // Textarea should be cleared
    expect(textarea).toHaveValue('');
  });

  test('scrolls to bottom when new message is sent', async () => {
    const user = userEvent.setup();
    render(<ChatWindow recipient={{ name: 'Test User' }} />);

    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button', { name: /send/i });
    await user.type(textarea, 'Scroll test');
    await user.click(sendButton);

    // Check that scrollIntoView was called (mocked in setupTests.js)
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    expect(screen.getByText('Scroll test')).toBeInTheDocument();
  });
});